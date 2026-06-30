# 🎓 Educator AI — Advanced Autonomous Career Mentor & Intelligence Gateway

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-emerald.svg)]()
[![Organized By](https://img.shields.io/badge/Organized%20By-Ranadeep%20Saha-purple.svg)]()

**Educator AI** is a state-of-the-art autonomous career guidance and learning roadmap gateway built to provide real-time, verified academic and professional counseling. Equipped with an intelligent keyword routing engine, live asynchronous connections to official national and international education gateways, interactive mindmaps, and a strictly locked local storage architecture, Educator AI empowers learners worldwide to navigate their academic journeys with **200% official data accuracy**.

---

## ✨ Key Features

1. **🤖 Autonomous AI Career Mentor Engine**
   * Real-time conversational guidance with specialized prompt understanding.
   * Instant keyword routing engine connecting queries to verified academic tracks (Engineering, Management BBA/MBA, Medical/NEET, Space Science, Law, Paramedical, Data Science, Animation/VFX, and UPSC Civil Services).

2. **🌐 Live Official Portal Verification Gateway**
   * Asynchronous verification checks against authoritative national and international portals:
     * **UGC e-Syllabus & Higher Education Portal** (`ugc.gov.in`)
     * **AICTE India Technical Education** (`aicte-india.org`)
     * **MBAGate Government Management Directory** (`mbagate.in`)
     * **National Apprenticeship Training Scheme (NATS)** (`apprenticeshipindia.gov.in`)
     * **BachelorsPortal & Educations.com Global Directories**
     * **Shiksha Design & VFX Portals**

3. **🔒 Strictly Locked Static User Profile Architecture**
   * Total separation between **Personal Identity State** and **Active Exploration State**.
   * Your personal profile (Name, Role, Bio, and Skills) is permanently preserved in local client storage (`STATIC_USER_PROFILE`) and never altered when exploring other career roadmaps in the AI Mentor dashboard.
   * 100% user-controlled manual edits via the interactive Profile editor modal.

4. **🔐 Mandatory Google Firebase Authentication Gateway**
   * Seamless integration with Google Firebase Authentication SDKs.
   * Enforced entry gatekeeper protecting core intelligence workflows (`Educator.html`) until user verification is achieved via Google account sign-in.

5. **🗺️ Interactive 2D/3D Mindmaps & Synchronized Dashboard**
   * Dynamic career path visualizers with drag, pan, zoom, and node tracking.
   * Synchronized updates across all workspace tabs: **Dashboard**, **Career Path**, **Learning Hub (Courses & Job Openings)**, and **Profile**.

---

## 🎯 Use Cases

* **High School Graduates (10th/12th Pass):** Discover official stream selections, UGC norms, and polytechnic diploma roadmaps.
* **Undergraduate & Graduate Students (BCA / B.Sc CS / BBA / B.Tech):** Access structured semester milestones, verified skill requirements, and free official course catalogs.
* **Management & Business Aspirants (MBA / BBA):** Explore national government seat matrixes alongside global university degrees and corporate HR/Finance apprenticeships.
* **Career Switchers & Upskillers:** Benchmark market salaries ($78K–$115K trajectories) and get actionable next steps to crack high-paying tech and management roles.
* **Educational Institutions & Counselors:** Deploy as a standalone interactive counseling kiosk with zero server lag.

---

## 🚀 Installation & Deployment Guide

### Prerequisites
* [Node.js](https://nodejs.org/) (Version 18.x or higher recommended)
* Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/unknown404-practice/EducatorAI.git
cd EducatorAI
```

### Step 2: Install Backend Dependencies
```bash
npm install
```

### Step 3: Start the Backend Intelligence Server
```bash
node server.js
```
The server will start locally at **`http://localhost:3000`**.

### Step 4: Launch the Application
Open your web browser and navigate to:
```
http://localhost:3000
```
Or open `landingpage.html` directly in your web browser to test offline client capabilities.

---

## 🛡️ Data Security & Privacy Architecture

Educator AI is designed with a **privacy-first, zero-knowledge cloud footprint**:
* **Client-Side Storage Sandbox:** All personal user profiles, chat histories, customized skills, and progress checkpoints are stored exclusively inside the browser's local sandbox (`localStorage`).
* **Zero Data Exfiltration:** No personal identifiable information (PII) is uploaded, shared, or sold to third-party tracking servers.
* **User-Owned Modifications:** Your personal profile is locked behind strict user authorization flags (`isManuallyUpdated`). Only explicit user actions can overwrite personal profile fields.

---

## 📄 License

Licensed under the **Apache License, Version 2.0**. You may obtain a copy of the License at:

```
http://www.apache.org/licenses/LICENSE-2.0
```

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

---

## 🏆 Credits & Copyright

**Organized & Developed By:**  
### **© Ranadeep Saha**  
*Member of Google Developer Group (GDG)*

All Rights Reserved. Educator AI © 2026. Designed for global excellence in digital education and autonomous mentorship.
