/**
 * Educator AI Interactive Mindmap Canvas UI
 * Renders smooth responsive SVG Bézier curves, draggable canvas pan/zoom,
 * and step-by-step career path progression.
 */

var MINDMAP_NODES = [];
var EDGES = [];
var currentStep = 0;
var mmScale = 1, mmTx = 0, mmTy = 0;
var nodeEls = [];
var mmResizeObs = null;

function getEffectiveViewportSize() {
  var vp = document.getElementById('mmViewport');
  if (!vp) return { w: 800, h: 450 };
  var r = vp.getBoundingClientRect();
  var w = (r && r.width > 150) ? r.width : (vp.offsetWidth > 150 ? vp.offsetWidth : (vp.parentElement && vp.parentElement.clientWidth > 150 ? vp.parentElement.clientWidth : 800));
  var h = (r && r.height > 150) ? r.height : (vp.offsetHeight > 150 ? vp.offsetHeight : 450);
  return { w: w, h: h };
}

function getNodeLayoutPos(idx) {
  var s = getEffectiveViewportSize();
  var len = MINDMAP_NODES.length;
  var n = MINDMAP_NODES[idx];
  if (!n) return { x: 0, y: 0 };
  var xRatio = len > 1 ? 0.12 + (idx / (len - 1)) * 0.76 : 0.5;
  var yPositions = [0.5, 0.22, 0.78, 0.28, 0.72, 0.5];
  var yRatio = typeof n.y === 'number' ? n.y : yPositions[idx % yPositions.length];
  if (len >= 3) {
    if (idx === 0 || idx === len - 1) {
      yRatio = 0.5;
    } else if (idx % 2 === 1) {
      yRatio = 0.24;
    } else {
      yRatio = 0.76;
    }
  }
  return { x: xRatio * s.w, y: yRatio * s.h };
}

function getNodePos(n) {
  var s = getEffectiveViewportSize();
  return { x: n.x * s.w, y: n.y * s.h };
}

function initMindmap() {
  if (!window.USER_DATA && typeof window.loadUserData === 'function') {
    window.loadUserData();
  }
  var userData = window.USER_DATA || {};
  MINDMAP_NODES = userData.mindmap || [];
  window.MINDMAP_NODES = MINDMAP_NODES;

  EDGES = [];
  for (var i = 0; i < MINDMAP_NODES.length - 1; i++) {
    EDGES.push([i, i + 1]);
  }
  var canvas = document.getElementById('mmCanvas');
  var vp = document.getElementById('mmViewport');
  if (!canvas || !vp) return;

  canvas.innerHTML = '<svg id="mmSvg" width="100%" height="100%" style="position:absolute;inset:0;pointer-events:none;overflow:visible;z-index:0"></svg>';
  nodeEls = [];

  MINDMAP_NODES.forEach(function (n, i) {
    var el = document.createElement('div');
    el.className = 'mm-node' + (i === 0 ? ' current' : '') + (i !== 0 ? ' future' : '');
    el.dataset.idx = i;
    var lbl = document.createElement('span');
    lbl.className = 'mm-lbl';
    lbl.textContent = i === 0 ? 'Current' : (i === MINDMAP_NODES.length - 1 ? 'Target' : 'Step ' + (i + 1));
    el.appendChild(lbl);
    el.appendChild(document.createTextNode(n.label));
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      goToStep(i === currentStep ? (currentStep + 1) % MINDMAP_NODES.length : i);
    });
    canvas.appendChild(el);
    nodeEls.push(el);
  });

  if (!mmResizeObs && typeof ResizeObserver !== 'undefined') {
    var mmTimer = null;
    mmResizeObs = new ResizeObserver(function () {
      var p = document.getElementById('screen-path');
      if (!p || !p.classList.contains('active')) return;
      if (mmTimer) clearTimeout(mmTimer);
      mmTimer = setTimeout(function () {
        syncNodePositions();
        drawEdges();
      }, 40);
    });
    mmResizeObs.observe(vp);
  }

  syncNodePositions();
  drawEdges();
  goToStep(typeof currentStep === 'number' && currentStep < MINDMAP_NODES.length ? currentStep : 0);
  bindViewportDrag();
}

function syncNodePositions() {
  nodeEls.forEach(function (el, i) {
    if (!MINDMAP_NODES[i]) return;
    var pos = getNodeLayoutPos(i);
    el.style.left = pos.x + 'px';
    el.style.top = pos.y + 'px';
    el.style.transform = 'translate(-50%,-50%)';
  });
}

function drawEdges() {
  var vp = document.getElementById('mmViewport');
  if (!vp) return;
  var svg = document.getElementById('mmSvg');
  if (!svg) return;
  var r = vp.getBoundingClientRect();
  svg.setAttribute('width', r.width);
  svg.setAttribute('height', r.height);
  svg.setAttribute('viewBox', '0 0 ' + r.width + ' ' + r.height);

  var accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#38bdf8';
  var border = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#334155';
  var defs = '<defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="' + border + '"/></marker><marker id="arrowhead-accent" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="' + accent + '"/></marker></defs>';
  var lines = '';

  EDGES.forEach(function (e) {
    if (!MINDMAP_NODES[e[0]] || !MINDMAP_NODES[e[1]]) return;
    var p1 = getNodeLayoutPos(e[0]), p2 = getNodeLayoutPos(e[1]);
    var dx = p2.x - p1.x, dy = p2.y - p1.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return;
    var ux = dx / dist, uy = dy / dist;
    var startX = p1.x + ux * 68, startY = p1.y + uy * 24;
    var endX = p2.x - ux * 72, endY = p2.y - uy * 26;
    var cx1 = startX + ux * (dist * 0.25), cy1 = startY + uy * (dist * 0.25);
    var cx2 = endX - ux * (dist * 0.25), cy2 = endY - uy * (dist * 0.25);
    var visited = e[1] <= currentStep;
    var marker = visited ? 'url(#arrowhead-accent)' : 'url(#arrowhead)';
    var stroke = visited ? accent : border;
    lines += '<path d="M' + startX + ',' + startY + ' C' + cx1 + ',' + cy1 + ' ' + cx2 + ',' + cy2 + ' ' + endX + ',' + endY + '" fill="none" stroke="' + stroke + '" stroke-width="2" marker-end="' + marker + '"/>';
  });
  svg.innerHTML = defs + lines;
}

function goToStep(idx) {
  if (idx < 0 || idx >= MINDMAP_NODES.length) return;
  currentStep = idx;
  window.currentStep = currentStep;
  nodeEls.forEach(function (el, i) {
    el.className = 'mm-node';
    if (i === currentStep) el.classList.add('current');
    else if (i < currentStep) el.classList.add('visited');
    else el.classList.add('future');
  });
  var c = document.getElementById('stepCounter');
  if (c) c.textContent = 'Step ' + (idx + 1) + ' / ' + MINDMAP_NODES.length;
  var d = document.getElementById('stepDesc');
  if (d && MINDMAP_NODES[idx]) d.textContent = (MINDMAP_NODES[idx].step || '') + ' - ' + MINDMAP_NODES[idx].label;
  drawEdges();
}

function bindViewportDrag() {
  var vp = document.getElementById('mmViewport');
  var canvas = document.getElementById('mmCanvas');
  if (!vp || !canvas) return;
  var startX, startY, startTx, startTy, isDown = false;

  function onStart(e) {
    var pt = e.touches ? e.touches[0] : e;
    isDown = true;
    startX = pt.clientX;
    startY = pt.clientY;
    startTx = mmTx;
    startTy = mmTy;
    if (canvas) canvas.style.cursor = 'grabbing';
  }

  function onMove(e) {
    if (!isDown) return;
    e.preventDefault();
    var pt = e.touches ? e.touches[0] : e;
    mmTx = startTx + (pt.clientX - startX);
    mmTy = startTy + (pt.clientY - startY);
    canvas.style.transform = 'translate(' + mmTx + 'px,' + mmTy + 'px) scale(' + mmScale + ')';
  }

  function onEnd() {
    isDown = false;
    if (canvas) canvas.style.cursor = 'grab';
  }

  canvas.addEventListener('mousedown', onStart);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);
  canvas.addEventListener('touchstart', onStart, { passive: true });
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend', onEnd);
  vp.addEventListener('wheel', function (e) {
    e.preventDefault();
    var d = e.deltaY > 0 ? -0.05 : 0.05;
    mmScale = Math.max(0.3, Math.min(3, mmScale + d));
    canvas.style.transform = 'translate(' + mmTx + 'px,' + mmTy + 'px) scale(' + mmScale + ')';
  }, { passive: false });
}

function zoomIn() {
  mmScale = Math.min(3, mmScale + 0.15);
  var c = document.getElementById('mmCanvas');
  if (c) c.style.transform = 'translate(' + mmTx + 'px,' + mmTy + 'px) scale(' + mmScale + ')';
}

function zoomOut() {
  mmScale = Math.max(0.3, mmScale - 0.15);
  var c = document.getElementById('mmCanvas');
  if (c) c.style.transform = 'translate(' + mmTx + 'px,' + mmTy + 'px) scale(' + mmScale + ')';
}

function zoomReset() {
  mmScale = 1;
  mmTx = 0;
  mmTy = 0;
  var c = document.getElementById('mmCanvas');
  if (c) c.style.transform = '';
  syncNodePositions();
  drawEdges();
}

// Global exports
window.MINDMAP_NODES = MINDMAP_NODES;
window.EDGES = EDGES;
window.currentStep = currentStep;
window.initMindmap = initMindmap;
window.syncNodePositions = syncNodePositions;
window.drawEdges = drawEdges;
window.goToStep = goToStep;
window.zoomIn = zoomIn;
window.zoomOut = zoomOut;
window.zoomReset = zoomReset;
