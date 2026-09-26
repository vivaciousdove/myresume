import { test, expect } from '@playwright/test';

test.describe('Resume site - smoke + quality gate', () => {

  test('loads resume, validates required links, verifies canonical PDF, and has no console errors', async ({
    page,
  }) => {

    // Capture browser console errors as a QA signal.
    const consoleErrors: string[] = [];

    // Capture failed HTTP responses so failures can be traced
    // back to the resource that caused them.
    const failedResponses: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    page.on('response', (response) => {
      if (response.status() >= 400) {
        failedResponses.push(`${response.status()} ${response.url()}`);
      }
    });

    // baseURL is defined in playwright.config.ts.
    await page.goto('/', { waitUntil: 'domcontentloaded' });


    // =====================================================
    // CORE PAGE VALIDATION
    // =====================================================

    await expect(page).toHaveTitle(/Todd|Resume|Portfolio/i);

    await expect(page.locator('body')).toBeVisible();

    await expect(page.locator('body')).toContainText(/Todd Conner/i);

    // Validate the source-of-truth professional headline.
    await expect(page.locator('body')).toContainText(
      /QA Automation Engineer\s*\|\s*Software Development Engineer in Test/i
    );


    // =====================================================
    // REQUIRED PROFESSIONAL LINKS
    // =====================================================

    const emailLink = page.locator('a[href^="mailto:"]');

    await expect(emailLink).toBeVisible();

    await expect(emailLink).toHaveAttribute('href', /^mailto:/i);


    const githubLink = page.locator('a[href*="github.com"]');

    await expect(githubLink).toBeVisible();

    await expect(githubLink).toHaveAttribute(
      'href',
      /github\.com/i
    );


    const linkedinLink = page.locator('a[href*="linkedin.com"]');

    await expect(linkedinLink).toBeVisible();

    await expect(linkedinLink).toHaveAttribute(
      'href',
      /linkedin\.com/i
    );


    // =====================================================
    // CANONICAL RESUME PDF CONTRACT
    // =====================================================

    const pdfLink = page.getByRole('link', {
      name: /download pdf/i,
    });

    await expect(pdfLink).toBeVisible();

    /*
     * Quality contract:
     * The website must always reference the canonical resume artifact.
     *
     * This prevents an obsolete or alternate PDF from accidentally
     * becoming the public downloadable resume.
     */
    await expect(pdfLink).toHaveAttribute(
      'href',
      './assets/todd_conner_qa.pdf'
    );

    const pdfHref = await pdfLink.getAttribute('href');

    expect(
      pdfHref,
      'Canonical Download PDF link must contain an href'
    ).toBeTruthy();


    // =====================================================
    // PDF AVAILABILITY VALIDATION
    // =====================================================

    const pdfResponse = await page.request.get(pdfHref!);

    expect(
      pdfResponse.ok(),
      `Canonical PDF request failed for ${pdfHref}`
    ).toBeTruthy();

    const contentType =
      pdfResponse.headers()['content-type'] || '';

    expect(
      contentType,
      `Unexpected content-type for canonical PDF: "${contentType}"`
    ).toMatch(/application\/pdf/i);


    // =====================================================
    // HTTP / CONSOLE QUALITY GATE
    // =====================================================

    // Diagnostic output identifies HTTP 4xx/5xx resources.
    console.log('HTTP error responses:', failedResponses);

    /*
     * A clean browser console is part of the smoke-test
     * release quality gate.
     */
    expect(
      consoleErrors,
      `Console errors found:\n${consoleErrors.join('\n')}`
    ).toEqual([]);


    // =====================================================
    // TEST EVIDENCE
    // =====================================================

    // Preserve a rendered-page artifact for troubleshooting
    // and CI evidence.
    await page.screenshot({
      path: 'test-results/resume-home-debug.png',
      fullPage: true,
    });

  });

});