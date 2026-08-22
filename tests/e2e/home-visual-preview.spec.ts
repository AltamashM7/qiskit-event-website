// @ts-expect-error The Playwright runner provides Node built-ins without a Node type package.
import fs from 'node:fs';
// @ts-expect-error The Playwright runner provides Node built-ins without a Node type package.
import path from 'node:path';
import { expect, test, type Page } from '@playwright/test';

const boxName = "Schrödinger's box";
const qaDirectory = path.resolve('dist', '__qa');
const requiredImageSelectors = [
  '.home-stage__background-art img',
  '.schrodinger-box__image--closed',
  '.schrodinger-box__image--reveal',
];

type CaptureInteraction = 'click' | 'tap';

async function waitForHomeAssets(page: Page) {
  await page.waitForFunction(
    (selectors: string[]) =>
      selectors.every((selector) => {
        const image = document.querySelector(selector);
        return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0;
      }),
    requiredImageSelectors,
  );

  await page.evaluate(async (selectors: string[]) => {
    const images = selectors
      .map((selector) => document.querySelector(selector))
      .filter((element): element is HTMLImageElement => element instanceof HTMLImageElement);

    await Promise.all(images.map((image) => image.decode()));
  }, requiredImageSelectors);

  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      }),
  );
}

async function captureHomeState(
  page: Page,
  fileName: string,
  interaction?: CaptureInteraction,
) {
  fs.mkdirSync(qaDirectory, { recursive: true });

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'load' });
  await waitForHomeAssets(page);

  const box = page.getByRole('button', { name: boxName });
  await expect(box).toBeVisible();

  if (interaction === 'click') {
    await box.click();
  } else if (interaction === 'tap') {
    await box.tap();
  }

  const isRevealed = Boolean(interaction);
  await expect(box).toHaveAttribute('aria-pressed', String(isRevealed));
  await expect(box).toHaveAttribute('data-revealed', String(isRevealed));
  await expect(box.locator('.schrodinger-box__image--closed')).toHaveCSS(
    'opacity',
    isRevealed ? '0' : '1',
  );
  await expect(box.locator('.schrodinger-box__image--reveal')).toHaveCSS(
    'opacity',
    isRevealed ? '1' : '0',
  );

  await page.screenshot({
    path: path.join(qaDirectory, fileName),
    fullPage: false,
  });
}

test('captures desktop Home closed preview', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop-only visual capture.');
  await captureHomeState(page, 'home-desktop-closed.png');
});

test('captures desktop Home reveal preview', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop-only visual capture.');
  await captureHomeState(page, 'home-desktop-reveal.png', 'click');
});

test('captures mobile Home closed preview', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile-only visual capture.');
  await captureHomeState(page, 'home-mobile-closed.png');
});

test('captures mobile Home reveal preview', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile-only visual capture.');
  await captureHomeState(page, 'home-mobile-reveal.png', 'tap');
});
