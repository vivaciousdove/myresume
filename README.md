## 🌐 Live Site
👉 https://vivaciousdove.github.io/myresume/

---

## 🎯 Purpose
- Provide a **public, always-updated resume** accessible without downloads  
- Demonstrate comfort with **front-end fundamentals** (HTML/CSS/JS)  
- Treat the resume itself as a **deployable artifact**, not just a document  
- Enable fast access to **project repositories, CI evidence, and automation demos**

---

## 🧩 What’s Included

### Resume Site
- `index.html` – Resume content and structure  
- `style.css` – Custom styling (no frameworks)  
- Lightweight JavaScript enhancements (no build tools)  
- PDF version included for traditional workflows  

### Quality & Automation
- **Playwright tests** validating page availability and core UI elements  
- **GitHub Actions CI workflow** ensuring the resume site stays deployable  
- Test results and artifacts captured for every workflow run  

This repo intentionally applies **QA and CI practices to a personal site** to demonstrate how I approach quality—even for small systems.

---

## 🛠 Tech Stack
- HTML / CSS / JavaScript  
- Playwright (UI validation)  
- GitHub Actions (CI)  
- GitHub Pages (deployment)

---


## ▶️ Running Tests Locally

Install dependencies:
```bash
npm install
```

```bash
npx playwright install
```
```bash
npx playwright test
```

```bash
npx playwright show-report
```

---

## 🚦 CI Quality Gate

Every push and pull request triggers a **GitHub Actions workflow** that acts as a quality gate for the resume site.

The pipeline performs the following steps:

1. Installs project dependencies  
2. Starts a local web server for the static site  
3. Runs Playwright smoke tests  
4. Uploads test artifacts (HTML report, traces, screenshots)

If tests fail, the workflow fails — preventing broken deployments.

**Workflow location:**  
`.github/workflows/resume-playwright.yml`


---

## 📂  Repository Structure
- .github/workflows/   → CI pipeline (Playwright quality gate)  
- tests/               → Playwright test suite  
- assets/              → Supporting files (PDF resume, images)  
- playwright.config.ts → Test + local server configuration  
- index.html           → Resume site  
- style.css            → Styling  

---

## 🔍 Why This Matters
- Rather than listing tools on a resume, this project shows:
- How I think about reliability, automation, and evidence
- How I treat even simple systems with production discipline
- How QA, CI/CD, and cloud concepts apply beyond large applications

---

## 📎Related Work
This resume links to larger projects demonstrating:

- API automation

- UI automation

- End-to-end testing

- CI pipelines with reporting

---

## 📄 Author
Todd Conner
QA Engineer | AWS Certified Cloud Practitioner

From signals to software — building dependable systems, one test and one cloud at a time.