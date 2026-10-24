const fs = require('fs');
const path = require('path');
const NodeCache = require('node-cache');

const DISK_CACHE_PATH = path.join(__dirname, '..', 'data', 'query-cache.json');
const DEFAULT_TTL_SECONDS = 86400; // 24 hours

class CacheService {
  constructor() {
    this.memoryCache = new NodeCache({
      stdTTL: DEFAULT_TTL_SECONDS,
      checkperiod: 3600,
      useClones: false
    });

    this.diskCacheMap = new Map();
    this.saveTimeout = null;
    this.initDiskBackup();
  }

  initDiskBackup() {
    try {
      if (fs.existsSync(DISK_CACHE_PATH)) {
        const raw = fs.readFileSync(DISK_CACHE_PATH, 'utf8');
        if (raw.trim()) {
          const parsed = JSON.parse(raw);
          const now = Date.now();
          let loadedCount = 0;

          for (const [key, entry] of Object.entries(parsed)) {
            if (entry && entry.expiresAt && entry.expiresAt > now && entry.value) {
              const remainingTtl = Math.max(1, Math.floor((entry.expiresAt - now) / 1000));
              this.memoryCache.set(key, entry.value, remainingTtl);
              this.diskCacheMap.set(key, entry);
              loadedCount++;
            }
          }
          console.log(`[CacheService] Hydrated ${loadedCount} persistent entries from disk cache`);
        }
      }
    } catch (err) {
      console.warn(`[CacheService] Could not hydrate disk cache: ${err.message}`);
    }
  }

  scheduleDiskSave() {
    if (this.saveTimeout) return;
    this.saveTimeout = setTimeout(() => {
      this.saveTimeout = null;
      try {
        const now = Date.now();
        const serializable = {};
        for (const [key, entry] of this.diskCacheMap.entries()) {
          if (entry && entry.expiresAt > now) {
            serializable[key] = entry;
          } else {
            this.diskCacheMap.delete(key);
          }
        }
        const dir = path.dirname(DISK_CACHE_PATH);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DISK_CACHE_PATH, JSON.stringify(serializable, null, 2), 'utf8');
      } catch (err) {
        console.warn(`[CacheService] Failed writing disk cache: ${err.message}`);
      }
    }, 1500); // 1.5s debounce to batch disk writes
  }

  get(key) {
    if (!key) return null;
    const memVal = this.memoryCache.get(key);
    if (memVal !== undefined) {
      return memVal;
    }

    const diskEntry = this.diskCacheMap.get(key);
    if (diskEntry && diskEntry.expiresAt > Date.now()) {
      const remainingTtl = Math.max(1, Math.floor((diskEntry.expiresAt - Date.now()) / 1000));
      this.memoryCache.set(key, diskEntry.value, remainingTtl);
      return diskEntry.value;
    }

    return null;
  }

  has(key) {
    if (!key) return false;
    if (this.memoryCache.has(key)) return true;
    const diskEntry = this.diskCacheMap.get(key);
    return !!(diskEntry && diskEntry.expiresAt > Date.now());
  }

  set(key, value, ttlSeconds = DEFAULT_TTL_SECONDS) {
    if (!key || value === undefined) return;
    this.memoryCache.set(key, value, ttlSeconds);

    const expiresAt = Date.now() + (ttlSeconds * 1000);
    this.diskCacheMap.set(key, { value, expiresAt });
    this.scheduleDiskSave();
  }

  getStats() {
    const memStats = this.memoryCache.getStats();
    return {
      keys: this.memoryCache.keys().length,
      diskKeys: this.diskCacheMap.size,
      hits: memStats.hits,
      misses: memStats.misses,
      ksize: memStats.ksize,
      vsize: memStats.vsize
    };
  }
}

module.exports = new CacheService();
