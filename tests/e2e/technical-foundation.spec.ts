import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  { label: 'Home', path: '/', heading: 'Home' },
  { label: 'About Event', path: '/about-event/', heading: 'About Event' },
  {
    label: 'About Quantum Mechanics',
    path: '/about-quantum-mechanics/',
    heading: 'About Quantum Mechanics',
  },
] as const;

const assetPaths = [
  '/assets/home/background/home-probability-field-frame-a-v1.png',
  '/assets/home/schrodinger/cat-living-master-v1.png',
  '/assets/home/schrodinger/cat-skeleton-master-v1.png',
  '/assets/home/schrodinger/cat-split-adjusted-v1.png',
  '/assets/home/schrodinger/box-closed-v1.png',
  '/assets/home/schrodinger/box-reveal-v1.png',
] as const;

for (const route of routes) {
  test(`${route.label} route has the technical shell and passes Axe baseline`, async ({ page }) => {
    const response = await page.goto(route.path);

    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.heading);

    const navigation = page.getByRole('navigation', { name: 'Primary' });
    await expect(navigation).toBeVisible();
    await expect(navigation.getByRole('link')).toHaveCount(routes.length);
    await expect(navigation.locator('[aria-current="page"]')).toHaveText(route.label);

    const hrefs = await navigation.getByRole('link').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href')),
    );
    expect(hrefs).toEqual(routes.map((item) => item.path));

    const results = await new AxeBuilder({ page }).analyze();
    const seriousViolations = results.violations.filter((violation) =>
      violation.impact === 'serious' || violation.impact === 'critical',
    );
    expect(seriousViolations, JSON.stringify(seriousViolations, null, 2)).toEqual([]);
  });
}

test('Home navigation reaches the other route shells through real links', async ({ page }) => {
  await page.goto('/');

  for (const route of routes.slice(1)) {
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: route.label }).click();
    await expect(page).toHaveURL(new RegExp(`${route.path.replaceAll('/', '\\/')}$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.heading);
    await page.goto('/');
  }
});

test('Keyboard focus reaches the skip link and primary navigation', async ({ page }) => {
  await page.goto('/');

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link').first()).toBeFocused();
});

test('The neutral shell has no horizontal document overflow', async ({ page }) => {
  await page.goto('/');

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
});

test('Reduced motion collapses the reusable motion-duration tokens', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const motionTokens = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    return {
      short: styles.getPropertyValue('--motion-duration-short').trim(),
      medium: styles.getPropertyValue('--motion-duration-medium').trim(),
    };
  });

  expect(motionTokens.short).toMatch(/^0(?:ms|s)$/);
  expect(motionTokens.medium).toMatch(/^0(?:ms|s)$/);
});

test('Approved canonical assets are served as PNG resources', async ({ request }) => {
  for (const assetPath of assetPaths) {
    const response = await request.get(`http://127.0.0.1:4321${assetPath}`);

    expect(response.ok(), `${assetPath} returned ${response.status()}`).toBeTruthy();
    expect(response.headers()['content-type']).toMatch(/image\/png/);
  }
});
