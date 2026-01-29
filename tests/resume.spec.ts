
import { test, expect } from '@playwright/test';

/**
 * Resume site smoke test:
 * - Loads page
 * - Verifies visible content
 * - Verifies key outbound links
 * - Verifies PDF link exists + downloads
 * - Ensures no console errors
 * - Takes a deterministic screenshot for visual stability
 */
test.describe('Resume site - smoke + quality gate', () => {
  test('index loads, links valid, PDF reachable, no console errors', async ({ page }) => {
    // Capture console errors (QA signal)
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    // Local dev server route (used by CI webServer, see config below)
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded' });

    // Basic load assertions
    await expect(page).toHaveTitle(/Todd|Resume|Portfolio/i);

    // Content assertions (edit these selectors/text to match your actual page)
    await expect(page.locator('body')).toBeVisible();

    // If you have a visible name header, keep this; otherwise update text
    await expect(page.locator('body')).toContainText(/Todd Conner|Todd/i);

    // Link assertions (update URLs/text to match your page)
    // Example: Medium link
    const mediumLink = page.locator('a[href*="medium.com"]');
    if (await mediumLink.count()) {
      await expect(mediumLink.first()).toBeVisible();
      await expect(mediumLink.first()).toHaveAttribute('href', /medium\.com/i);
    }

    // Example: email link
    const mailtoLink = page.locator('a[href^="mailto:"]');
    if (await mailtoLink.count()) {
      await expect(mailtoLink.first()).toBeVisible();
      await expect(mailtoLink.first()).toHaveAttribute('href', /^mailto:/i);
    }

    // PDF reachability check:
    // Assumes you link to Todd_Conner_resume.pdf somewhere on the page.
    // If not, you can still test it directly by requesting it.
    const pdfHref = 'Todd_Conner_resume.pdf';

    // Request-level validation (faster + more reliable than UI click for PDFs)
    const pdfResponse = await page.request.get(`http://127.0.0.1:5173/${pdfHref}`);
    expect(pdfResponse.ok()).toBeTruthy();
    const contentType = pdfResponse.headers()['content-type'] || '';
    expect(contentType).toMatch(/application\/pdf/i);

    // No console errors is a clean QA gate (adjust if you expect known benign errors)
    expect(consoleErrors, `Console errors found:\n${consoleErrors.join('\n')}`).toEqual([]);

    // Visual stability snapshot (baseline created on first run)
    await expect(page).toHaveScreenshot('resume-home.png', {
      fullPage: true,
      // Keep defaults; tune later if needed
    });
  });
});
