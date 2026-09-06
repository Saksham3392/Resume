# Saksham Sheoran — Portfolio & Interactive Developer Experience

<div align="center">

  <h3>Full-Stack Software Engineer & Systems Builder</h3>
  <p>Computer Science & Engineering Student at <strong>Chitkara University</strong> (AI-ML)</p>

  [![GitHub](https://img.shields.io/badge/GitHub-%40Saksham3392-181717?style=for-the-badge&logo=github)](https://github.com/Saksham3392)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-Saksham%20Sheoran-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/saksham-sheoran/)
  [![Email](https://img.shields.io/badge/Email-sakshamsheoran2005%40gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:sakshamsheoran2005@gmail.com)
  [![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
  [![Nginx](https://img.shields.io/badge/Nginx-Alpine-009639?style=for-the-badge&logo=nginx)](https://nginx.org/)

</div>

---

## 🚀 Overview

An engineering-first personal portfolio and interactive resume website built to Apple Human Interface Guidelines (HIG) standards with dark glassmorphism, responsive micro-interactions, live GitHub telemetry, an interactive developer CLI terminal, and an 8-semester academic transcript engine.

---

## ✨ Key Features

- **Dynamic Ambient Canvas & Reactive Lighting:** Physics-based reactive constellation particles and mouse-reactive lighting.
- **Synthesized Web Audio Engine:** Custom browser Web Audio synthesizer providing tactile micro-click and keyboard haptic audio.
- **Categorized Engineering Skills:** 6 domain cards covering Core Languages, Frontend, Backend, Databases, Tools & DevOps, and Computer Science Fundamentals.
- **Selected Projects & GitHub Activity:** Live interactive carousel showcasing real open-source systems including the **Computer Networks Assessment Engine (`CN-MCQs`)** and **Java OOP Practice Suite**.
- **Academic Transcripts & Grades Explorer:** Two-column master-detail transcript viewer featuring all 4 years and 8 semesters with verified university grades (Current CGPA: **9.03 / 10.00**).
- **Interactive Developer Terminal:** Built-in shell supporting interactive commands (`help`, `skills`, `projects`, `grades`, `about`, `clear`).
- **Live GitHub Telemetry API:** Real-time metrics fetched dynamically from `@Saksham3392` public GitHub REST API.
- **In-Browser Printable Paper Resume:** High-craft digital sheet view with dedicated `@media print` CSS for one-click clean PDF export.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | HTML5, Modern JavaScript (ES6+ Modules), Tailwind CSS, FontAwesome 6 |
| **Styling** | Custom Glassmorphism, CSS Custom Properties, Smooth Choreography Animations |
| **Audio** | HTML5 Web Audio API (Frequency & Gain node synthesizer) |
| **Deployment** | Docker, Nginx Alpine, Render, GitHub Pages, Vercel |

---

## 📂 Project Structure

```text
├── index.html            # Main portfolio document and UI structure
├── nginx.conf            # Production Nginx server configuration (gzip, caching, security headers)
├── Dockerfile            # Lightweight Nginx Alpine multi-stage container
├── .dockerignore         # Docker build exclude rules
├── .gitignore            # Git version control ignore rules
├── README.md             # Project documentation and deployment guide
├── css/
│   └── custom.css        # Glassmorphic styles, print stylesheet, typography tokens
├── js/
│   ├── data.js           # Centralized portfolio data (skills, projects, grades, terminal)
│   └── main.js           # Core interactivity, carousel, modal, audio, and terminal engine
└── assets/
    ├── chitkara-logo.png # Official Chitkara University crest
    ├── profile.jpg       # Profile photo
    └── (optional) Saksham_Sheoran_Resume.pdf
```

---

## 💻 Local Development

### Option 1: Python (Instant)
```bash
# Start a local HTTP server on port 7080
python -m http.server 7080
```
Visit `http://localhost:7080` in your browser.

### Option 2: Node.js / npx serve
```bash
npx serve .
```

### Option 3: Docker
```bash
# Build the Docker image
docker build -t saksham-portfolio .

# Run the container on port 8080
docker run -d -p 8080:80 --name portfolio-site saksham-portfolio
```
Visit `http://localhost:8080` in your browser.

---

## 🌐 Publishing to GitHub & Render

### Step 1: Push Code to GitHub

1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Saksham Sheoran Portfolio"
   ```

2. Create a new repository on [GitHub](https://github.com/new) named `Resume` or `portfolio`.

3. Push your repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/Saksham3392/YOUR-REPO-NAME.git
   git push -u origin main
   ```

---

### Step 2: Deploy to Render

You can deploy to Render in two ways:

#### Method A: Render Static Site (Recommended — 100% Free & Fast)
1. Go to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** → **Static Site**.
3. Connect your GitHub account and select your portfolio repository.
4. Set the settings:
   - **Name:** `saksham-sheoran-portfolio`
   - **Branch:** `main`
   - **Build Command:** *(leave empty)*
   - **Publish Directory:** `.` *(a single dot represents the root directory)*
5. Click **Create Static Site**.
   Render will deploy your portfolio instantly with free automatic SSL (`https://...onrender.com`).

#### Method B: Render Web Service via Docker
1. Go to **New +** → **Web Service**.
2. Select your repository.
3. Render will automatically detect the **`Dockerfile`**.
4. Choose the **Free** instance type.
5. Click **Create Web Service**.
   Render will build the Nginx Alpine container and serve it globally.

---

### Step 3: Deploy to GitHub Pages (Alternative Free Option)

1. On GitHub, go to your repository **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
3. Choose the **`main`** branch and **`/ (root)`** folder.
4. Click **Save**.
   Your site will be live at `https://saksham3392.github.io/YOUR-REPO-NAME/`.

---

## 👤 Author

**Saksham Sheoran**  
- **University:** Chitkara University, Punjab, India  
- **Degree:** Bachelor of Engineering in Computer Science & Engineering (AI-ML)  
- **CGPA:** 9.03 / 10.00  
- **GitHub:** [@Saksham3392](https://github.com/Saksham3392)  
- **LinkedIn:** [Saksham Sheoran](https://www.linkedin.com/in/saksham-sheoran/)  
- **Email:** [sakshamsheoran2005@gmail.com](mailto:sakshamsheoran2005@gmail.com)
