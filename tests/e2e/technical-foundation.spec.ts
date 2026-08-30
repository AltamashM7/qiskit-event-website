import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  { label: 'Home', path: '/', heading: 'Qiskit Event' },
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
    await expect(page.locator('.site-master-navigation')).toHaveCount(1);
    await expect(page.locator('.stage-shell__navigation .master-navigator')).toHaveCount(0);
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

test('Site-level Master Navigator stays fixed and stable through scrolling', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route.path);

    const navigation = page.locator('.site-master-navigation');
    const before = await navigation.boundingBox();
    expect(before).not.toBeNull();
    await expect(navigation).toHaveCSS('position', 'fixed');

    if (route.path === '/') {
      const footprint = await page.evaluate(() => ({
        navigatorHeight: document.querySelector('.site-master-navigation')?.getBoundingClientRect().height ?? 0,
        reservedHeight: document.querySelector('#home-stage .stage-shell__navigation')?.getBoundingClientRect().height ?? 0,
      }));
      expect(footprint.reservedHeight).toBeCloseTo(footprint.navigatorHeight, 1);
    }

    await page.evaluate(() => {
      document.body.style.minHeight = '200vh';
      window.scrollTo(0, window.innerHeight);
    });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    const after = await navigation.boundingBox();
    expect(after).not.toBeNull();
    expect(after!.x).toBeCloseTo(before!.x, 1);
    expect(after!.y).toBeCloseTo(before!.y, 1);
    expect(after!.width).toBeCloseTo(before!.width, 1);
    expect(after!.height).toBeCloseTo(before!.height, 1);

    await page.evaluate(() => {
      document.body.style.minHeight = '';
      window.scrollTo(0, 0);
    });
  }
});

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
