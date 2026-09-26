# QA Resume Site

A public, deployable QA resume site built with HTML, CSS, JavaScript, Playwright, GitHub Actions, and GitHub Pages.

The project treats my resume as a small software product: the content is maintained as a web experience, the downloadable resume is controlled as a canonical artifact, and automated testing validates critical functionality before changes are published.

## Live Site

https://vivaciousdove.github.io/myresume/

---

## Purpose

This repository serves three purposes:

1. **Public Resume** — provide an accessible web version of my current QA resume.
2. **QA Demonstration** — apply automated validation and release-quality checks to a real web application.
3. **CI/CD Demonstration** — use GitHub Actions and GitHub Pages to test and deploy changes through a repeatable workflow.

The project demonstrates that quality practices can be applied even to small systems.

---

## Resume Artifact Strategy

The website uses one canonical downloadable PDF:

```text
assets/todd_conner_qa.pdf
```

The Download PDF button in `index.html` references this exact artifact.

```text
Resume source of truth
        |
        +--> index.html
        |
        +--> assets/todd_conner_qa.pdf
                    |
                    +--> Download PDF
```

This structure reduces the risk of accidentally publishing or linking to an obsolete resume.

---

## What the Site Includes

### Resume Content

The web resume presents:

- Professional summary
- Software quality engineering and automation skills
- QA engineering experience
- Wireless/RF engineering experience
- Education
- Certifications
- Professional development
- GitHub and LinkedIn links
- Canonical downloadable PDF resume

### User Experience

The site also includes:

- Responsive layout
- Light and dark modes
- Browser-persisted theme preference
- Print-friendly styling
- GitHub-derived last-updated information

---

## Quality Engineering

Playwright provides an automated smoke and quality gate for the site.

The current test validates:

- Resume page loads successfully
- Expected page title is present
- Todd Conner content is visible
- Current QA professional headline is present
- Email link is available
- GitHub link is available
- LinkedIn link is available
- Download PDF link points to the canonical artifact
- Canonical PDF is reachable
- PDF response has the expected `application/pdf` content type
- Browser console remains free of unexpected errors

A full-page screenshot is also captured as test evidence.

---

## Canonical PDF Contract

The automated test explicitly requires:

```text
./assets/todd_conner_qa.pdf
```

This is intentional.

Testing only for a `.pdf` extension could allow an obsolete resume to become the public download while the test continued to pass.

The stricter assertion turns the canonical resume path into an automated quality contract.

---

## Tech Stack

| Area             | Technology            |
| ---------------- | --------------------- |
| Front End        | HTML, CSS, JavaScript |
| UI Testing       | Playwright            |
| Test Language    | TypeScript            |
| CI               | GitHub Actions        |
| Hosting          | GitHub Pages          |
| Local Web Server | http-server           |
| Source Control   | Git / GitHub          |

---

## Running Locally

Install dependencies:

```bash
npm install
```

Install the Playwright browser:

```bash
npx playwright install
```

Run the automated quality gate:

```bash
npm test
```

Run the test with a visible browser:

```bash
npm run test:headed
```

Open the latest Playwright HTML report:

```bash
npm run test:report
```

---

## CI/CD Quality Gate

The repository includes a GitHub Actions workflow for automated Playwright validation.

```text
.github/workflows/resume-playwright.yml
```

Changes pushed through the repository trigger the CI workflow, which executes the automated resume-site quality gate in a clean environment.

A failing test causes the workflow to fail, providing release evidence before or alongside deployment.

GitHub Pages provides the public deployment of the static site.

---

## Repository Structure

```text
myresume/
|
+-- .github/
|   +-- workflows/
|       +-- resume-playwright.yml
|
+-- assets/
|   +-- todd_conner_qa.pdf
|
+-- tests/
|   +-- resume.spec.ts
|
+-- .gitignore
+-- index.html
+-- style.css
+-- package.json
+-- package-lock.json
+-- playwright.config.ts
+-- README.md
```

Generated dependencies, Playwright reports, and test-result directories are excluded from source control.

---

## QA Approach

This project follows a simple release-validation model:

```text
Change
  |
  v
Local validation
  |
  v
Playwright quality gate
  |
  v
Git commit / push
  |
  v
GitHub Actions
  |
  v
CI validation
  |
  v
GitHub Pages deployment
  |
  v
Live-site verification
```

The objective is not to create unnecessary automation around a simple resume.

The objective is to demonstrate a repeatable QA principle:

> Validate the behaviors and artifacts that matter, preserve useful evidence, and make failures visible before they reach the user.

---

## Current Validation Status

The synchronized resume release has been validated through:

- Local Playwright regression — PASS
- Headed browser regression — PASS
- Browser console quality gate — PASS
- Canonical PDF validation — PASS
- GitHub Actions Playwright quality gate — PASS
- GitHub Pages deployment — PASS
- Live-site functional verification — PASS

---

## Author

**Todd Conner**

QA Automation Engineer | Software Development Engineer in Test

AWS Certified Cloud Practitioner | PMP
