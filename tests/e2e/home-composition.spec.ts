import { test, expect } from '@playwright/test';

const boxName = "Schrödinger's box";

test('Home starts closed with the approved shared-composition layers', async ({ page }) => {
  await page.goto('/');

  const box = page.getByRole('button', { name: boxName });
  await expect(box).toBeVisible();
  await expect(box).toHaveAttribute('aria-pressed', 'false');
  await expect(box).toHaveAttribute('data-revealed', 'false');
  await expect(box.locator('.schrodinger-box__image--closed')).toHaveCSS('opacity', '1');
  await expect(box.locator('.schrodinger-box__image--reveal')).toHaveCSS('opacity', '0');

  const layerGeometry = await box.locator('img').evaluateAll((images) =>
    images.map((image) => {
      const rect = image.getBoundingClientRect();
      return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
    }),
  );

  expect(layerGeometry[0]).toEqual(layerGeometry[1]);
});

test('Desktop hover and focus reveal the box temporarily', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Hover is desktop-only coverage.');

  await page.goto('/');
  const box = page.getByRole('button', { name: boxName });

  await box.hover({ force: true });
  await expect(box).toHaveAttribute('data-revealed', 'true');
  await page.mouse.move(10, 10);
  await expect(box).toHaveAttribute('data-revealed', 'false');

  await box.focus();
  await expect(box).toHaveAttribute('data-revealed', 'true');
  await page.keyboard.press('Tab');
  await expect(box).toHaveAttribute('data-revealed', 'false');
});

test('Desktop click locks and unlocks the reveal state', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Mouse lock coverage is desktop-only.');

  await page.goto('/');
  const box = page.getByRole('button', { name: boxName });

  await box.click({ force: true });
  await expect(box).toHaveAttribute('aria-pressed', 'true');
  await expect(box).toHaveAttribute('data-revealed', 'true');

  await page.mouse.move(10, 10);
  await expect(box).toHaveAttribute('data-revealed', 'true');

  await box.click({ force: true });
  await expect(box).toHaveAttribute('aria-pressed', 'false');
  await page.mouse.move(10, 10);
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  });
  await expect(box).toHaveAttribute('data-revealed', 'false');
});

test('Keyboard activation exposes the locked state accessibly', async ({ page }) => {
  await page.goto('/');
  const box = page.getByRole('button', { name: boxName });

  await box.focus();
  await expect(box).toHaveAttribute('data-revealed', 'true');

  await page.keyboard.press('Enter');
  await expect(box).toHaveAttribute('aria-pressed', 'true');

  await page.keyboard.press('Tab');
  await expect(box).toHaveAttribute('data-revealed', 'true');

  await box.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await expect(box).toHaveAttribute('aria-pressed', 'false');
  await expect(box).toHaveAttribute('data-revealed', 'false');
});

test('Mobile tap toggles the reveal state', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Tap is mobile-only coverage.');

  await page.goto('/');
  const box = page.getByRole('button', { name: boxName });

  await box.tap({ force: true });
  await expect(box).toHaveAttribute('aria-pressed', 'true');
  await expect(box).toHaveAttribute('data-revealed', 'true');

  await box.tap({ force: true });
  await expect(box).toHaveAttribute('aria-pressed', 'false');
  await expect(box).toHaveAttribute('data-revealed', 'false');
});

test('Reduced motion keeps the interaction intentional without idle animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const box = page.getByRole('button', { name: boxName });
  const animationName = await box.evaluate((element) => getComputedStyle(element).animationName);

  expect(animationName).toBe('none');
  await box.focus();
  await expect(box).toHaveAttribute('data-revealed', 'true');
});

test('Home composition stays within the viewport at its target size', async ({ page }) => {
  await page.goto('/');

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    clientHeight: document.documentElement.clientHeight,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);

  const boxBounds = await page.getByRole('button', { name: boxName }).boundingBox();
  expect(boxBounds).not.toBeNull();
  expect(boxBounds!.x).toBeGreaterThanOrEqual(0);
  expect(boxBounds!.y).toBeGreaterThanOrEqual(0);
  expect(boxBounds!.x + boxBounds!.width).toBeLessThanOrEqual(dimensions.clientWidth);
  expect(boxBounds!.y + boxBounds!.height).toBeLessThanOrEqual(dimensions.clientHeight);
});
