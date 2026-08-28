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
const renderedWaveCount = 20;
const expectedWaveFamilyCounts = new Map(
  wavePaths.map((path, index) => [path, index < 2 ? 1 : 3]),
);

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
      waveStartTokens: waves.map((wave) => getComputedStyle(wave).getPropertyValue('--wave-x-start').trim()),
      waveEndTokens: waves.map((wave) => getComputedStyle(wave).getPropertyValue('--wave-x-end').trim()),
      waveWidths: waves.map((wave) => getComputedStyle(wave).getPropertyValue('--wave-width').trim()),
      waveHeights: waves.map((wave) => getComputedStyle(wave).getPropertyValue('--wave-height').trim()),
      waveOpacities: waves.map((wave) => getComputedStyle(wave).getPropertyValue('--wave-opacity').trim()),
      waveStartTranslations: waves.map((wave) => {
        const animation = wave.getAnimations()[0];
        if (!(animation?.effect instanceof KeyframeEffect)) return null;
        const transform = animation.effect.getKeyframes()[0]?.transform;
        const match = typeof transform === 'string' ? transform.match(/calc\(-50% \+ ([\d.]+)px\)/) : null;
        return match ? Number(match[1]) : null;
      }),
      waveEndTranslations: waves.map((wave) => {
        const animation = wave.getAnimations()[0];
        if (!(animation?.effect instanceof KeyframeEffect)) return null;
        const keyframes = animation.effect.getKeyframes();
        const transform = keyframes[keyframes.length - 1]?.transform;
        const match = typeof transform === 'string' ? transform.match(/calc\(-50% \+ ([\d.]+)px\)/) : null;
        return match ? Number(match[1]) : null;
      }),
      waveStartLeadingEdgeRatios: waves.map((wave) => {
        const animation = wave.getAnimations()[0];
        const keyframes = animation?.effect instanceof KeyframeEffect ? animation.effect.getKeyframes() : [];
        const transform = keyframes[0]?.transform;
        const match = typeof transform === 'string' ? transform.match(/calc\(-50% \+ ([\d.]+)px\)/) : null;
        const startTranslation = match ? Number(match[1]) : Number.NaN;
        const waveWidth = wave.getBoundingClientRect().width;
        const parentLeft = wave.parentElement?.getBoundingClientRect().left ?? 0;
        const layoutLeft = parentLeft + (wave instanceof HTMLElement ? wave.offsetLeft : 0);
        const paintedLeadingEdge = layoutLeft - waveWidth / 2 + startTranslation + waveWidth * 0.055;
        return paintedLeadingEdge / element.getBoundingClientRect().width;
      }),
      desktopBoundaryAnchor: getComputedStyle(element)
        .getPropertyValue('--home-wave-boundary-anchor')
        .trim(),
      stageWidth: element.getBoundingClientRect().width,
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
    'wave-03-thin-yellow-b',
    'wave-03-thin-yellow-c',
    'wave-04-thin-ivory',
    'wave-04-thin-ivory-b',
    'wave-04-thin-ivory-c',
    'wave-05-dashed-white-upper',
    'wave-05-dashed-white-upper-b',
    'wave-05-dashed-white-upper-c',
    'wave-06-dashed-white-lower',
    'wave-06-dashed-white-lower-b',
    'wave-06-dashed-white-lower-c',
    'wave-07-halftone-yellow-band',
    'wave-07-halftone-yellow-band-b',
    'wave-07-halftone-yellow-band-c',
    'wave-08-translucent-cream-ribbon',
    'wave-08-translucent-cream-ribbon-b',
    'wave-08-translucent-cream-ribbon-c',
  ]);
  expect(new Set(scene.waveAssets)).toEqual(new Set(wavePaths));
  wavePaths.forEach((path) => {
    const expectedCount = expectedWaveFamilyCounts.get(path)!;
    expect(scene.waveAssets.filter((asset) => asset === path)).toHaveLength(expectedCount);
    expect(scene.waveBackgrounds.filter((background) => background.includes(path))).toHaveLength(
      expectedCount,
    );
  });
  expect(scene.waveAnimationNames).toEqual(Array(renderedWaveCount).fill('home-layered-wave-travel'));
  expect(scene.waveTimingFunctions).toEqual(Array(renderedWaveCount).fill('linear'));
  expect(scene.waveIterationCounts).toEqual(Array(renderedWaveCount).fill('infinite'));
  expect(new Set(scene.waveDurations).size).toBe(renderedWaveCount);
  expect(new Set(scene.waveDelays).size).toBe(renderedWaveCount);
  const durationSeconds = scene.waveDurations.map((duration) => Number.parseFloat(duration));
  expect(Math.min(...durationSeconds)).toBe(11);
  expect(Math.max(...durationSeconds)).toBe(26);
  expect(scene.desktopBoundaryAnchor).toBe('54cqw');
  expect(scene.waveStartTokens.every((start) => start.includes('cqw'))).toBe(true);
  expect(scene.waveEndTokens.every((end) => end.endsWith('vw'))).toBe(true);
  const waveStartTranslations = scene.waveStartTranslations as number[];
  const waveEndTranslations = scene.waveEndTranslations as number[];
  expect(waveStartTranslations.every(Number.isFinite)).toBe(true);
  expect(waveEndTranslations.every(Number.isFinite)).toBe(true);
  expect(
    waveStartTranslations.every(
      (start) => start >= scene.stageWidth * 0.6 && start <= scene.stageWidth * 0.96,
    ),
  ).toBe(true);
  expect(waveEndTranslations.every((end) => end >= scene.stageWidth * 1.13)).toBe(true);
  expect(
    scene.waveStartLeadingEdgeRatios.every((leadingEdge) => leadingEdge > 0.4 && leadingEdge < 0.64),
  ).toBe(true);
  expect(scene.waveTransforms.every((transform) => transform !== 'none')).toBe(true);
  expect(scene.waveWidths.filter((width) => Number.parseFloat(width) > 165).length).toBe(6);
  expect(scene.waveHeights.filter((height) => Number.parseFloat(height) > 80).length).toBe(6);
  expect(Number.parseFloat(scene.waveOpacities[0])).toBe(1);
  expect(Number.parseFloat(scene.waveOpacities[1])).toBe(1);
  const dominantRibbonIndex = scene.waveIds.indexOf('wave-08-translucent-cream-ribbon');
  expect(dominantRibbonIndex).toBeGreaterThanOrEqual(0);
  expect(scene.waveStartTokens[dominantRibbonIndex]).toBe('calc(54cqw + 40cqw)');
  expect(scene.waveEndTokens[dominantRibbonIndex]).toBe('155vw');
  expect(scene.waveWidths[dominantRibbonIndex]).toBe('220%');
  expect(scene.waveHeights[dominantRibbonIndex]).toBe('500%');
  expect(Number.parseFloat(scene.waveOpacities[dominantRibbonIndex])).toBe(0.5);
  expect(scene.baseZIndex).toBe('0');
  expect(scene.waveZIndexes).toEqual([
    '4',
    '3',
    '5',
    '5',
    '5',
    '5',
    '5',
    '5',
    '6',
    '7',
    '7',
    '6',
    '7',
    '7',
    '1',
    '1',
    '1',
    '0',
    '1',
    '1',
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

test('Desktop wave spawning stays near the overlay seam across desktop widths', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop-only layered background coverage.');

  const desktopWidths = [1024, 1440, 1920];
  const reports = [];

  for (const width of desktopWidths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });

    reports.push(
      await page.locator('[data-home-layered-background]').evaluate((element) => {
        const waves = Array.from(element.querySelectorAll('[data-wave-id]'));
        const parseTranslation = (transform: unknown) => {
          if (typeof transform !== 'string') return null;
          const match = transform.match(/calc\(-50% \+ ([\d.]+)px\)/);
          return match ? Number(match[1]) : null;
        };

        return {
          stageWidth: element.getBoundingClientRect().width,
          boundaryAnchor: getComputedStyle(element)
            .getPropertyValue('--home-wave-boundary-anchor')
            .trim(),
          waves: waves.map((wave) => {
            const animation = wave.getAnimations()[0];
            const keyframes = animation?.effect instanceof KeyframeEffect ? animation.effect.getKeyframes() : [];
            const startTranslation = parseTranslation(keyframes[0]?.transform);
            const endTranslation = parseTranslation(keyframes[keyframes.length - 1]?.transform);
            const waveWidth = wave.getBoundingClientRect().width;
            const parentLeft = wave.parentElement?.getBoundingClientRect().left ?? 0;
            const layoutLeft = parentLeft + (wave instanceof HTMLElement ? wave.offsetLeft : 0);
            const paintedLeadingEdge =
              layoutLeft - waveWidth / 2 + (startTranslation ?? Number.NaN) + waveWidth * 0.055;

            return {
              startToken: getComputedStyle(wave).getPropertyValue('--wave-x-start').trim(),
              startTranslation,
              endTranslation,
              paintedLeadingEdgeRatio: paintedLeadingEdge / element.getBoundingClientRect().width,
            };
          }),
        };
      }),
    );
  }

  expect(reports.map((report) => report.boundaryAnchor)).toEqual(['54cqw', '54cqw', '54cqw']);
  reports.forEach((report) => {
    expect(report.waves).toHaveLength(renderedWaveCount);
    expect(report.waves.every((wave) => wave.startToken.includes('cqw'))).toBe(true);
    expect(
      report.waves.every(
        (wave) =>
          typeof wave.startTranslation === 'number' &&
          wave.startTranslation / report.stageWidth >= 0.6 &&
          wave.startTranslation / report.stageWidth <= 0.96,
      ),
    ).toBe(true);
    expect(
      report.waves.every(
        (wave) =>
          typeof wave.endTranslation === 'number' &&
          wave.endTranslation / report.stageWidth >= 1.13,
      ),
    ).toBe(true);
    expect(
      report.waves.every(
        (wave) => wave.paintedLeadingEdgeRatio > 0.4 && wave.paintedLeadingEdgeRatio < 0.64,
      ),
    ).toBe(true);
  });

  for (let index = 0; index < renderedWaveCount; index += 1) {
    const startRatios = reports.map(
      (report) => report.waves[index].startTranslation! / report.stageWidth,
    );
    expect(Math.max(...startRatios) - Math.min(...startRatios)).toBeLessThan(0.01);
  }
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
