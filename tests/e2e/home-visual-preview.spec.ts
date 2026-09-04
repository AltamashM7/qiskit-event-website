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
const desktopLayeredBackgroundPaths = [
  '/assets/home/background/layered/web/desktop/base/home-probability-field-base-desktop.webp',
  '/assets/home/background/layered/web/desktop/overlay/home-probability-field-overlay-desktop.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-01-thick-cream-upper.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-02-thick-cream-lower.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-03-thin-yellow.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-04-thin-ivory.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-05-dashed-white-upper.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-06-dashed-white-lower.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-07-halftone-yellow-band.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-08-translucent-cream-ribbon.webp',
];
const mobileLayeredBackgroundPaths = [
  '/assets/home/mobile-layered/home-mobile-layered-base-v1.png',
  '/assets/home/mobile-layered/home-mobile-layered-overlay-v1.png',
  '/assets/home/background/layered/web/mobile/waves/wave-01-white-v3.png',
  '/assets/home/background/layered/web/mobile/waves/wave-02-white-v3.png',
  '/assets/home/background/layered/web/desktop/waves/wave-03-thin-yellow.webp',
  '/assets/home/background/layered/web/mobile/waves/wave-04-white-v1.png',
  '/assets/home/background/layered/web/desktop/waves/wave-05-dashed-white-upper.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-06-dashed-white-lower.webp',
  '/assets/home/background/layered/web/mobile/waves/wave-07-white-v1.png',
  '/assets/home/background/layered/web/mobile/waves/wave-08-white-v3.png',
];

type CaptureInteraction = 'click' | 'tap';

async function waitForAnimationFrames(page: Page) {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      }),
  );
}

async function waitForLayeredAssets(page: Page) {
  const paths = await page.evaluate(
    ({ desktopPaths, mobilePaths }) =>
      matchMedia('(min-width: 48rem)').matches ? desktopPaths : mobilePaths,
    { desktopPaths: desktopLayeredBackgroundPaths, mobilePaths: mobileLayeredBackgroundPaths },
  );

  await page.waitForFunction((paths: string[]) => {
    const resourcePaths = performance.getEntriesByType('resource').map((entry) => {
      try {
        return new URL(entry.name).pathname;
      } catch {
        return '';
      }
    });

    return paths.every((path) => resourcePaths.includes(path));
  }, paths);
}

async function waitForHomeAssets(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  const titleFont = await page.locator('.home-stage__title').evaluate((element) => ({
    family: getComputedStyle(element).fontFamily,
    loaded: document.fonts.check('400 1em "Archivo Black"'),
  }));
  expect(titleFont.family).toContain('Archivo Black');
  expect(titleFont.loaded).toBe(true);

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

  await waitForLayeredAssets(page);
  await waitForAnimationFrames(page);
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
  await expect(box.locator('.schrodinger-box__state--closed')).toHaveCSS(
    'opacity',
    isRevealed ? '0' : '1',
  );
  await expect(box.locator('.schrodinger-box__state--reveal')).toHaveCSS(
    'opacity',
    isRevealed ? '1' : '0',
  );

  if (interaction === 'tap') {
    await page.evaluate(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  }
  await waitForAnimationFrames(page);
  await expect(box).toHaveAttribute('aria-pressed', String(isRevealed));
  await expect(box).toHaveAttribute('data-revealed', String(isRevealed));

  await page.screenshot({
    path: path.join(qaDirectory, fileName),
    fullPage: false,
  });
}

async function captureHomeFormalPage(page: Page, fileName: string) {
  fs.mkdirSync(qaDirectory, { recursive: true });

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'load' });
  await waitForHomeAssets(page);
  await expect(page.locator('[data-formal-shell]')).toBeVisible();
  await expect(page.locator('.formal-footer')).toBeVisible();

  await page.screenshot({
    path: path.join(qaDirectory, fileName),
    fullPage: true,
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

test('captures compact mobile Home closed preview', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-compact-chromium', 'Compact mobile-only visual capture.');
  await captureHomeState(page, 'home-mobile-compact-closed.png');
});

test('captures compact mobile Home reveal preview', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-compact-chromium', 'Compact mobile-only visual capture.');
  await captureHomeState(page, 'home-mobile-compact-reveal.png', 'tap');
});

test('captures desktop Home formal page preview', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop-only formal-page visual capture.');
  await captureHomeFormalPage(page, 'home-formal-desktop.png');
});

test('captures mobile Home formal page preview', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile-only formal-page visual capture.');
  await captureHomeFormalPage(page, 'home-formal-mobile.png');
});

test('captures compact mobile Home formal page preview', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-compact-chromium', 'Compact mobile-only formal-page visual capture.');
  await captureHomeFormalPage(page, 'home-formal-compact.png');
});
