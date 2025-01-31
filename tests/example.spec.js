import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('SplitText Accessibility Tests', () => {
  test('should pass basic accessibility checks', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const accessibilityScanResults = await new AxeBuilder({ page }).include('#output-text').analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
