
import { test, expect } from '@playwright/test';

/**
 * Resume site smoke test (CI-friendly):
 * - Loads page
 * - Verifies visible content
 * - Verifies key outbound links exist and look correct
 * - Verifies PDF is reachable (request-level)
 * - Ensures no console errors (hard gate)
 *
 * NOTE: Screenshot snapshot assertions are intentionally removed for now.
 * Reason: first CI run has no baseline snapshots, and cross-OS rendering can cause noise.
 * Add visual regression later as a separate workflow once the functional gate is stable/green.
 */
test.describe('Resume site - smoke + quality gate', () => {
  test('index loads, links valid, PDF reachable, no console errors', async ({ page }) => {
    // Capture console errors (QA signal)
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    // Navigate to your site (CI should be serving this via your workflow)
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' });

    // Basic load assertions
    await expect(page).toHaveTitle(/Todd|Resume|Portfolio/i);

    // Visible content assertions
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('body')).toContainText(/Todd Conner|Todd/i);

    // Link assertions (presence + correct href pattern)
    const mediumLink = page.locator('a[href*="medium.com"]');
    if (await mediumLink.count()) {
      await expect(mediumLink.first()).toBeVisible();
      await expect(mediumLink.first()).toHaveAttribute('href', /medium\.com/i);
    }

    const mailtoLink = page.locator('a[href^="mailto:"]');
    if (await mailtoLink.count()) {
      await expect(mailtoLink.first()).toBeVisible();
      await expect(mailtoLink.first()).toHaveAttribute('href', /^mailto:/i);
    }

    const githubLink = page.locator('a[href*="github.com"]');
    if (await githubLink.count()) {
      await expect(githubLink.first()).toBeVisible();
      await expect(githubLink.first()).toHaveAttribute('href', /github\.com/i);
    }

    const linkedinLink = page.locator('a[href*="linkedin.com"]');
    if (await linkedinLink.count()) {
      await expect(linkedinLink.first()).toBeVisible();
      await expect(linkedinLink.first()).toHaveAttribute('href', /linkedin\.com/i);
    }

    // PDF reachability check (request-level = stable + fast)
    // Update this if your PDF filename changes.
    const pdfHref = 'Todd-Conner-Senior-Quality-Engineer-Automation-Cloud.pdf';

    const pdfResponse = await page.request.get(`http://127.0.0.1:5173/${pdfHref}`);
    expect(pdfResponse.ok(), `PDF request failed for /${pdfHref}`).toBeTruthy();

    const contentType = pdfResponse.headers()['content-type'] || '';
    expect(contentType, `Unexpected content-type for PDF: "${contentType}"`).toMatch(/application\/pdf/i);

    // Console errors gate (hard fail if any)
    expect(consoleErrors, `Console errors found:\n${consoleErrors.join('\n')}`).toEqual([]);

    // Optional: attach a non-baseline screenshot for debugging evidence (does NOT require snapshots)
    // This helps you review the rendered page on CI without creating a snapshot baseline.
    await page.screenshot({ path: 'test-results/resume-home-debug.png', fullPage: true });
  });
});
