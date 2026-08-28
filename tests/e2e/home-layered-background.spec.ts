import { expect, test } from '@playwright/test';

const frameAPath = '/assets/home/background/home-probability-field-frame-a-v1.png';
const basePath =
  '/assets/home/background/layered/web/desktop/base/home-probability-field-base-desktop.webp';
const overlayPath =
  '/assets/home/background/layered/web/desktop/overlay/home-probability-field-overlay-desktop.webp';
const wavePaths = [
  '/assets/home/background/layered/web/desktop/waves/wave-01-thick-cream-upper.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-02-thick-cream-lower.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-03-thin-yellow.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-04-thin-ivory.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-05-dashed-white-upper.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-06-dashed-white-lower.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-07-halftone-yellow-band.webp',
  '/assets/home/background/layered/web/desktop/waves/wave-08-translucent-cream-ribbon.webp',
];
const desktopLayeredPaths = [basePath, overlayPath, ...wavePaths];
const renderedWaveCount = wavePaths.length * 2;

function requestedPath(url: string) {
  return new URL(url).pathname;
}

test('Desktop uses a dense layered base, reused wave families, and foreground overlay', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop-only layered background coverage.');

  const requests: string[] = [];
  page.on('request', (request) => requests.push(requestedPath(request.url())));

  await page.goto('/', { waitUntil: 'networkidle' });

  const scene = await page.locator('[data-home-layered-background]').evaluate((element) => {
    const base = element.querySelector('.home-layered-background__base img');
    const overlay = element.querySelector('[data-layered-background-overlay]');
    const stageBackground = element.closest('.stage-shell__background');
    const subject = element.closest('.stage-shell')?.querySelector('.stage-shell__subject');
    const waves = Array.from(element.querySelectorAll('[data-wave-id]'));

    return {
      baseCurrentSrc: base instanceof HTMLImageElement ? new URL(base.currentSrc).pathname : null,
      overlayBackground: overlay instanceof HTMLElement ? getComputedStyle(overlay).backgroundImage : '',
      waveCount: waves.length,
      waveIds: waves.map((wave) => wave.getAttribute('data-wave-id')),
      waveAssets: waves.map((wave) => wave.getAttribute('data-wave-asset')),
      waveBackgrounds: waves.map((wave) => getComputedStyle(wave).backgroundImage),
      waveAnimationNames: waves.map((wave) => getComputedStyle(wave).animationName),
      waveTimingFunctions: waves.map((wave) => getComputedStyle(wave).animationTimingFunction),
      waveIterationCounts: waves.map((wave) => getComputedStyle(wave).animationIterationCount),
      waveDurations: waves.map((wave) => getComputedStyle(wave).animationDuration),
      waveDelays: waves.map((wave) => getComputedStyle(wave).animationDelay),
      waveTransforms: waves.map((wave) => getComputedStyle(wave).transform),
      waveWidths: waves.map((wave) => getComputedStyle(wave).getPropertyValue('--wave-width').trim()),
      waveHeights: waves.map((wave) => getComputedStyle(wave).getPropertyValue('--wave-height').trim()),
      baseZIndex: base instanceof HTMLElement ? getComputedStyle(base.parentElement!).zIndex : null,
      waveZIndexes: waves.map((wave) => getComputedStyle(wave).zIndex),
      overlayZIndex: overlay instanceof HTMLElement ? getComputedStyle(overlay).zIndex : null,
      backgroundPlaneZIndex:
        stageBackground instanceof HTMLElement ? getComputedStyle(stageBackground).zIndex : null,
      subjectZIndex: subject instanceof HTMLElement ? getComputedStyle(subject).zIndex : null,
      frameExperimentNodes: element.querySelectorAll('[data-home-frame]').length,
    };
  });

  expect(scene.baseCurrentSrc).toBe(basePath);
  expect(scene.overlayBackground).toContain(overlayPath);
  expect(scene.waveCount).toBe(renderedWaveCount);
  expect(scene.waveIds).toEqual([
    'wave-01-thick-cream-upper',
    'wave-02-thick-cream-lower',
    'wave-03-thin-yellow',
    'wave-04-thin-ivory',
    'wave-05-dashed-white-upper',
    'wave-06-dashed-white-lower',
    'wave-07-halftone-yellow-band',
    'wave-08-translucent-cream-ribbon',
    'wave-01-thick-cream-upper-b',
    'wave-02-thick-cream-lower-b',
    'wave-03-thin-yellow-b',
    'wave-04-thin-ivory-b',
    'wave-05-dashed-white-upper-b',
    'wave-06-dashed-white-lower-b',
    'wave-07-halftone-yellow-band-b',
    'wave-08-translucent-cream-ribbon-b',
  ]);
  expect(new Set(scene.waveAssets)).toEqual(new Set(wavePaths));
  wavePaths.forEach((path) => {
    expect(scene.waveAssets.filter((asset) => asset === path)).toHaveLength(2);
    expect(scene.waveBackgrounds.filter((background) => background.includes(path))).toHaveLength(2);
  });
  expect(scene.waveAnimationNames).toEqual(Array(renderedWaveCount).fill('home-layered-wave-travel'));
  expect(scene.waveTimingFunctions).toEqual(Array(renderedWaveCount).fill('linear'));
  expect(scene.waveIterationCounts).toEqual(Array(renderedWaveCount).fill('infinite'));
  expect(new Set(scene.waveDurations).size).toBe(renderedWaveCount);
  expect(new Set(scene.waveDelays).size).toBe(renderedWaveCount);
  expect(scene.waveTransforms.every((transform) => transform !== 'none')).toBe(true);
  expect(scene.waveWidths.filter((width) => Number.parseFloat(width) > 165).length).toBe(4);
  expect(scene.waveHeights.filter((height) => Number.parseFloat(height) > 80).length).toBe(4);
  expect(scene.baseZIndex).toBe('0');
  expect(scene.waveZIndexes).toEqual([
    '4',
    '3',
    '5',
    '5',
    '6',
    '6',
    '1',
    '2',
    '4',
    '3',
    '5',
    '5',
    '7',
    '7',
    '1',
    '2',
  ]);
  expect(scene.overlayZIndex).toBe('20');
  expect(scene.backgroundPlaneZIndex).toBe('0');
  expect(scene.subjectZIndex).toBe('1');
  expect(scene.frameExperimentNodes).toBe(0);

  for (const path of desktopLayeredPaths) {
    expect(requests).toContain(path);
  }
  expect(requests).not.toContain(frameAPath);
  expect(requests).not.toContain('/assets/home/background/home-probability-field-frame-b-v1.png');
  expect(requests).not.toContain('/assets/home/background/home-probability-field-frame-c-v1.png');

  const keyframeTransforms = await page
    .locator('[data-wave-id]')
    .first()
    .evaluate((element) => {
      const animation = element.getAnimations()[0];
      if (!(animation?.effect instanceof KeyframeEffect)) return [];
      return animation.effect.getKeyframes().map((keyframe) => keyframe.transform ?? null);
    });

  expect(keyframeTransforms.length).toBe(2);
  expect(keyframeTransforms.every(Boolean)).toBe(true);
  expect(
    keyframeTransforms.every(
      (transform) => typeof transform === 'string' && transform.includes('translate3d'),
    ),
  ).toBe(true);
});

test('Desktop reduced motion keeps the dense layered composition static', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop-only layered background coverage.');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'networkidle' });

  const reducedState = await page.locator('[data-home-layered-background]').evaluate((element) => {
    const base = element.querySelector('.home-layered-background__base img');
    const overlay = element.querySelector('[data-layered-background-overlay]');
    const waves = Array.from(element.querySelectorAll('[data-wave-id]'));

    return {
      baseCurrentSrc: base instanceof HTMLImageElement ? new URL(base.currentSrc).pathname : null,
      overlayDisplay: overlay instanceof HTMLElement ? getComputedStyle(overlay).display : '',
      overlayBackground: overlay instanceof HTMLElement ? getComputedStyle(overlay).backgroundImage : '',
      waveCount: waves.length,
      waveDisplays: waves.map((wave) => getComputedStyle(wave).display),
      waveAnimationNames: waves.map((wave) => getComputedStyle(wave).animationName),
      waveAnimations: waves.map((wave) => wave.getAnimations().length),
      waveTransforms: waves.map((wave) => getComputedStyle(wave).transform),
      frameBOrCNodes: element.querySelectorAll('[src*="frame-b"], [src*="frame-c"]').length,
    };
  });

  expect(reducedState.baseCurrentSrc).toBe(basePath);
  expect(reducedState.overlayDisplay).toBe('block');
  expect(reducedState.overlayBackground).toContain(overlayPath);
  expect(reducedState.waveCount).toBe(renderedWaveCount);
  expect(reducedState.waveDisplays).toEqual(Array(renderedWaveCount).fill('block'));
  expect(reducedState.waveAnimationNames).toEqual(Array(renderedWaveCount).fill('none'));
  expect(reducedState.waveAnimations).toEqual(Array(renderedWaveCount).fill(0));
  expect(reducedState.waveTransforms.every((transform) => transform !== 'none')).toBe(true);
  expect(reducedState.frameBOrCNodes).toBe(0);

  await page.waitForTimeout(120);
  const laterTransforms = await page
    .locator('[data-wave-id]')
    .evaluateAll((waves) => waves.map((wave) => getComputedStyle(wave).transform));
  expect(laterTransforms).toEqual(reducedState.waveTransforms);
});

test('Mobile keeps Frame A and does not request desktop layered resources', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile-only resource selection coverage.');

  const requests: string[] = [];
  page.on('request', (request) => requests.push(requestedPath(request.url())));

  await page.goto('/', { waitUntil: 'networkidle' });

  const mobileState = await page.locator('[data-home-layered-background]').evaluate((element) => {
    const base = element.querySelector('.home-layered-background__base img');
    const waves = Array.from(element.querySelectorAll('[data-wave-id]'));
    const overlay = element.querySelector('[data-layered-background-overlay]');

    return {
      baseCurrentSrc: base instanceof HTMLImageElement ? new URL(base.currentSrc).pathname : null,
      waveCount: waves.length,
      waveDisplays: waves.map((wave) => getComputedStyle(wave).display),
      waveAnimationNames: waves.map((wave) => getComputedStyle(wave).animationName),
      overlayDisplay: overlay instanceof HTMLElement ? getComputedStyle(overlay).display : '',
    };
  });

  expect(mobileState.baseCurrentSrc).toBe(frameAPath);
  expect(mobileState.waveCount).toBe(renderedWaveCount);
  expect(requests).toContain(frameAPath);
  for (const path of desktopLayeredPaths) {
    expect(requests).not.toContain(path);
  }
  expect(mobileState.waveDisplays).toEqual(Array(renderedWaveCount).fill('none'));
  expect(mobileState.waveAnimationNames).toEqual(Array(renderedWaveCount).fill('none'));
  expect(mobileState.overlayDisplay).toBe('none');
});
