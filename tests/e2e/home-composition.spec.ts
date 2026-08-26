import { test, expect } from '@playwright/test';

const boxName = "Schrödinger's box";
const backgroundFrameSelector = '.home-stage__background-frame';
const backgroundFrameSources = [
  '/assets/home/background/home-probability-field-frame-a-v1.png',
  '/assets/home/background/home-probability-field-frame-b-v1.png',
  '/assets/home/background/home-probability-field-frame-c-v1.png',
];

function readTransformScale(transform: string) {
  const match = transform.match(/^matrix\(([-\d.]+)/);
  return Number(match?.[1]);
}

test('Home starts closed with the approved shared-composition layers', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const box = page.getByRole('button', { name: boxName });
  await expect(box).toBeVisible();
  await expect(box).toHaveAttribute('aria-pressed', 'false');
  await expect(box).toHaveAttribute('data-revealed', 'false');
  await expect(box.locator('.schrodinger-box__image--closed')).toHaveCSS('opacity', '1');
  await expect(box.locator('.schrodinger-box__image--reveal')).toHaveCSS('opacity', '0');

  const layerGeometry = await box.locator('img').evaluateAll((images) =>
    images.map((image) => {
      const element = image as HTMLImageElement;
      return { width: element.offsetWidth, height: element.offsetHeight };
    }),
  );

  expect(layerGeometry[0]).toEqual(layerGeometry[1]);

  const closedWrapper = await box.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { x: rect.x, y: rect.y + window.scrollY, width: rect.width, height: rect.height };
  });
  await box.focus();
  const revealedWrapper = await box.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { x: rect.x, y: rect.y + window.scrollY, width: rect.width, height: rect.height };
  });

  expect(revealedWrapper).toEqual(closedWrapper);
});

test('Home background provides the three approved frame layers with shared geometry', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');

  const background = page.locator('.home-stage__background-art');
  await expect(background).toHaveAttribute('data-background-ready', 'true');

  const frames = await background.locator(backgroundFrameSelector).evaluateAll((images) =>
    images.map((image) => {
      const element = image as HTMLImageElement;
      const bounds = element.getBoundingClientRect();
      return {
        source: element.getAttribute('src'),
        width: element.getAttribute('width'),
        height: element.getAttribute('height'),
        geometry: {
          x: Number(bounds.x.toFixed(3)),
          y: Number(bounds.y.toFixed(3)),
          width: Number(bounds.width.toFixed(3)),
          height: Number(bounds.height.toFixed(3)),
        },
      };
    }),
  );

  expect(frames).toHaveLength(3);
  expect(frames.map((frame) => frame.source)).toEqual(backgroundFrameSources);
  expect(frames.map((frame) => [frame.width, frame.height])).toEqual([
    ['1672', '941'],
    ['1672', '941'],
    ['1672', '941'],
  ]);
  expect(new Set(frames.map((frame) => JSON.stringify(frame.geometry))).size).toBe(1);
});

test('Normal motion enables a discrete 0.3 second Home background loop', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');

  const background = page.locator('.home-stage__background-art');
  await expect(background).toHaveAttribute('data-background-ready', 'true');

  const animationState = await background.locator(backgroundFrameSelector).evaluateAll((images) =>
    images.map((image) => {
      const styles = getComputedStyle(image);
      return {
        name: styles.animationName,
        duration: styles.animationDuration,
        timingFunction: styles.animationTimingFunction,
        iterationCount: styles.animationIterationCount,
      };
    }),
  );

  expect(animationState.map((frame) => frame.name)).toEqual([
    'home-background-frame-a',
    'home-background-frame-b',
    'home-background-frame-c',
  ]);
  expect(animationState.map((frame) => frame.duration)).toEqual(['0.3s', '0.3s', '0.3s']);
  expect(
    animationState.every((frame) => /(?:steps\(1(?:,\s*end)?\)|step-end)/.test(frame.timingFunction)),
  ).toBe(true);
  expect(animationState.map((frame) => frame.iterationCount)).toEqual(['infinite', 'infinite', 'infinite']);
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

  const tapHighlight = await box.evaluate((element) =>
    getComputedStyle(element).getPropertyValue('-webkit-tap-highlight-color'),
  );
  expect(tapHighlight).toBe('rgba(0, 0, 0, 0)');

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

  const background = page.locator('.home-stage__background-art');
  await expect(background).toHaveAttribute('data-background-ready', 'true');
  const backgroundState = await background.locator(backgroundFrameSelector).evaluateAll((images) =>
    images.map((image) => {
      const styles = getComputedStyle(image);
      return { animationName: styles.animationName, opacity: styles.opacity };
    }),
  );

  expect(backgroundState).toEqual([
    { animationName: 'none', opacity: '1' },
    { animationName: 'none', opacity: '0' },
    { animationName: 'none', opacity: '0' },
  ]);

  const box = page.getByRole('button', { name: boxName });
  const animationName = await box.evaluate((element) => getComputedStyle(element).animationName);

  expect(animationName).toBe('none');
  await box.focus();
  await expect(box).toHaveAttribute('data-revealed', 'true');
});

test('Home composition stays within the viewport at its target size', async ({ page }, testInfo) => {
  await page.goto('/');

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);

  const boxBounds = await page.getByRole('button', { name: boxName }).boundingBox();
  expect(boxBounds).not.toBeNull();
  expect(boxBounds!.x).toBeGreaterThanOrEqual(0);
  expect(boxBounds!.y).toBeGreaterThanOrEqual(0);
  expect(boxBounds!.x + boxBounds!.width).toBeLessThanOrEqual(dimensions.clientWidth);

  if (testInfo.project.name.startsWith('mobile-')) {
    const identityBounds = await page.locator('.home-stage__identity-content').boundingBox();
    const ledeBounds = await page.locator('.home-stage__lede').boundingBox();
    expect(identityBounds).not.toBeNull();
    expect(ledeBounds).not.toBeNull();
    expect(boxBounds!.y).toBeGreaterThanOrEqual(ledeBounds!.y + ledeBounds!.height + 16);
  }
});

test('Mobile flow keeps navigation, identity, copy, and subject separated', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile-'), 'Mobile flow coverage.');

  await page.goto('/');

  const geometry = await page.evaluate(() => {
    const rect = (selector: string) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const bounds = element.getBoundingClientRect();
      return { left: bounds.left, top: bounds.top, right: bounds.right, bottom: bounds.bottom };
    };

    return {
      nav: rect('#home-stage .stage-shell__navigation'),
      kicker: rect('.home-stage__kicker'),
      title: rect('.home-stage__title'),
      lede: rect('.home-stage__lede'),
      subject: rect('#home-stage .stage-shell__subject'),
      ledeLines: Array.from(document.querySelectorAll('.home-stage__lede-line')).map((line) => ({
        text: line.textContent?.trim() ?? '',
        display: getComputedStyle(line).display,
        background: getComputedStyle(line).backgroundColor,
      })),
      backgroundFit: getComputedStyle(
        document.querySelector('.home-stage__background-art img') as HTMLImageElement,
      ).objectFit,
      backgroundPosition: getComputedStyle(
        document.querySelector('.home-stage__background-art img') as HTMLImageElement,
      ).objectPosition,
      backgroundUnderlay: getComputedStyle(
        document.querySelector('.home-stage__background-art') as HTMLElement,
      ).backgroundImage,
      backgroundStyles: Array.from(
        document.querySelectorAll('.home-stage__background-art .home-stage__background-frame'),
      ).map((image) => {
        const styles = getComputedStyle(image);
        return { objectFit: styles.objectFit, objectPosition: styles.objectPosition, transform: styles.transform };
      }),
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    };
  });

  expect(geometry.nav).not.toBeNull();
  expect(geometry.kicker).not.toBeNull();
  expect(geometry.title).not.toBeNull();
  expect(geometry.lede).not.toBeNull();
  expect(geometry.subject).not.toBeNull();
  expect(geometry.nav!.bottom).toBeLessThan(geometry.kicker!.top);
  expect(geometry.kicker!.bottom).toBeLessThan(geometry.title!.top);
  expect(geometry.title!.bottom).toBeLessThan(geometry.lede!.top);
  expect(geometry.lede!.bottom + 16).toBeLessThanOrEqual(geometry.subject!.top);
  expect(geometry.subject!.left).toBeGreaterThanOrEqual(0);
  expect(geometry.subject!.right).toBeLessThanOrEqual(geometry.clientWidth);
  expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth);
  expect(geometry.backgroundFit).toBe('contain');
  expect(geometry.backgroundPosition).toBe('50% 50%');
  expect(geometry.backgroundUnderlay).toMatch(/linear-gradient\(90deg.*52%/);
  expect(geometry.backgroundStyles.map((style) => style.objectFit)).toEqual([
    'contain',
    'contain',
    'contain',
  ]);
  expect(geometry.backgroundStyles.map((style) => style.objectPosition)).toEqual([
    '50% 50%',
    '50% 50%',
    '50% 50%',
  ]);
  expect(geometry.backgroundStyles.map((style) => readTransformScale(style.transform))).toEqual([
    1.4,
    1.4,
    1.4,
  ]);
  expect(geometry.ledeLines).toEqual([
    {
      text: 'Explore quantum computing',
      display: 'block',
      background: 'rgba(247, 247, 245, 0.88)',
    },
    {
      text: 'through ideas, interaction,',
      display: 'block',
      background: 'rgba(247, 247, 245, 0.88)',
    },
    {
      text: 'and experimentation.',
      display: 'block',
      background: 'rgba(247, 247, 245, 0.88)',
    },
  ]);
});

test('Home title uses the vendored display font', async ({ page }) => {
  await page.goto('/');

  const fontState = await page.evaluate(async () => {
    await document.fonts.ready;
    const title = document.querySelector('.home-stage__title');
    if (!(title instanceof HTMLElement)) return null;
    return {
      family: getComputedStyle(title).fontFamily,
      loaded: document.fonts.check('400 1em "Archivo Black"'),
    };
  });

  expect(fontState).not.toBeNull();
  expect(fontState!.family).toContain('Archivo Black');
  expect(fontState!.loaded).toBe(true);
});

test('Home background reaches the target viewport edges without horizontal overflow', async ({ page }) => {
  await page.goto('/');

  const geometry = await page.locator('.home-stage__background-art').evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      viewportWidth: document.documentElement.clientWidth,
      viewportHeight: document.documentElement.clientHeight,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    };
  });

  expect(geometry.left).toBeLessThanOrEqual(0.5);
  expect(geometry.top).toBeLessThanOrEqual(0.5);
  expect(geometry.right).toBeGreaterThanOrEqual(geometry.viewportWidth - 0.5);
  expect(geometry.bottom).toBeGreaterThanOrEqual(geometry.viewportHeight - 0.5);
  expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth);
});

test('Desktop background preserves the accepted full-bleed crop and scale', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop-only background geometry coverage.');

  await page.goto('/');

  const styles = await page.locator(backgroundFrameSelector).evaluateAll((images) =>
    images.map((image) => {
      const computed = getComputedStyle(image);
      return {
        objectFit: computed.objectFit,
        objectPosition: computed.objectPosition,
        transform: computed.transform,
      };
    }),
  );

  expect(new Set(styles.map((style) => JSON.stringify(style))).size).toBe(1);
  expect(styles[0].objectFit).toBe('cover');
  expect(styles[0].objectPosition).toBe('50% 50%');
  expect(readTransformScale(styles[0].transform)).toBeCloseTo(1.04);
});
