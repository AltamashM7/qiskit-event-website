import sharp from 'sharp';
import { expect, test } from '@playwright/test';

declare const process: {
  cwd(): string;
};

const frameAPath = '/assets/home/background/home-probability-field-frame-a-v1.png';
const mobileBasePath = '/assets/home/mobile-layered/home-mobile-layered-base-v1.png';
const mobileOverlayPath = '/assets/home/mobile-layered/home-mobile-layered-overlay-v1.png';
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
const mobileWhiteWavePaths = [
  '/assets/home/background/layered/web/mobile/waves/wave-01-white-v3.png',
  '/assets/home/background/layered/web/mobile/waves/wave-02-white-v3.png',
  '/assets/home/background/layered/web/mobile/waves/wave-03-white-v1.png',
  '/assets/home/background/layered/web/mobile/waves/wave-04-white-v1.png',
  wavePaths[4],
  wavePaths[5],
  '/assets/home/background/layered/web/mobile/waves/wave-07-white-v1.png',
  '/assets/home/background/layered/web/mobile/waves/wave-08-white-v3.png',
];
const supersededMobileWavePaths = [
  '/assets/home/background/layered/web/mobile/waves/wave-01-warm-ivory-v1.png',
  '/assets/home/background/layered/web/mobile/waves/wave-01-white-v2.png',
  '/assets/home/background/layered/web/mobile/waves/wave-02-pale-butter-v1.png',
  '/assets/home/background/layered/web/mobile/waves/wave-02-sky-blue-v2.png',
  '/assets/home/background/layered/web/mobile/waves/wave-08-soft-champagne-v1.png',
  '/assets/home/background/layered/web/mobile/waves/wave-08-sky-cyan-v2.png',
];
const mobileWaveAssetPaths = mobileWhiteWavePaths;
const desktopLayeredPaths = [basePath, overlayPath, ...wavePaths];
const mobileLayeredPaths = [mobileBasePath, mobileOverlayPath, ...mobileWaveAssetPaths];
const renderedWaveCount = 20;
const renderedMobileWaveCount = 44;
const expectedMobileSmallWaveFamilyCounts = new Map([
  ['wave-03', 8],
  ['wave-04', 8],
  ['wave-05', 8],
  ['wave-06', 8],
]);
const expectedWaveFamilyCounts = new Map(
  wavePaths.map((path, index) => [path, index < 2 ? 1 : 3]),
);
const alphaThreshold = 16;
const opaqueAlphaThreshold = 250;
const spawnSafetyFraction = 0.02;

type AlphaRow = {
  y: number;
  left: number;
  right: number;
};

type AlphaProfile = {
  width: number;
  height: number;
  left: number;
  right: number;
  rows: AlphaRow[];
};

type OverlayProfile = {
  width: number;
  height: number;
  opaqueRightByRow: Array<number | null>;
};

type WaveMeasurement = {
  id: string | null;
  asset: string | null;
  layoutLeft: number;
  layoutTop: number;
  width: number;
  height: number;
  startTranslation: number | null;
  endTranslation: number | null;
  durationSeconds: number;
};

type DesktopWaveScene = {
  stageWidth: number;
  stageHeight: number;
  overlayScale: number;
  waves: WaveMeasurement[];
};

function assetFilePath(assetPath: string) {
  return `${process.cwd()}/public/${assetPath.replace(/^\/+/, '')}`;
}

async function readAlphaProfile(assetPath: string): Promise<AlphaProfile> {
  const { data, info } = await sharp(assetFilePath(assetPath)).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });
  const alphaChannel = info.channels - 1;
  const rows: AlphaRow[] = [];
  let left = info.width;
  let right = -1;

  for (let y = 0; y < info.height; y += 1) {
    let rowLeft = info.width;
    let rowRight = -1;

    for (let x = 0; x < info.width; x += 1) {
      const alpha = data[(y * info.width + x) * info.channels + alphaChannel];
      if (alpha >= alphaThreshold) {
        rowLeft = Math.min(rowLeft, x);
        rowRight = x;
      }
    }

    if (rowRight >= 0) {
      left = Math.min(left, rowLeft);
      right = Math.max(right, rowRight);
      rows.push({ y, left: rowLeft, right: rowRight });
    }
  }

  return { width: info.width, height: info.height, left, right, rows };
}

async function readOverlayProfile(): Promise<OverlayProfile> {
  const { data, info } = await sharp(assetFilePath(overlayPath)).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });
  const alphaChannel = info.channels - 1;
  const opaqueRightByRow: Array<number | null> = [];

  for (let y = 0; y < info.height; y += 1) {
    let longestRunLength = 0;
    let longestRunEnd: number | null = null;
    let runStart = -1;

    for (let x = 0; x <= info.width; x += 1) {
      const opaque =
        x < info.width && data[(y * info.width + x) * info.channels + alphaChannel] >= opaqueAlphaThreshold;

      if (opaque && runStart < 0) {
        runStart = x;
      }

      if ((!opaque || x === info.width) && runStart >= 0) {
        const runLength = x - runStart;
        if (runLength > longestRunLength) {
          longestRunLength = runLength;
          longestRunEnd = x - 1;
        }
        runStart = -1;
      }
    }

    opaqueRightByRow.push(longestRunEnd);
  }

  return { width: info.width, height: info.height, opaqueRightByRow };
}

let waveProfilesPromise: Promise<Map<string, AlphaProfile>> | undefined;
let overlayProfilePromise: Promise<OverlayProfile> | undefined;

function getWaveProfiles() {
  waveProfilesPromise ??= Promise.all(
    wavePaths.map(async (assetPath) => [assetPath, await readAlphaProfile(assetPath)] as const),
  ).then((entries) => new Map(entries));
  return waveProfilesPromise;
}

function getOverlayProfile() {
  overlayProfilePromise ??= readOverlayProfile();
  return overlayProfilePromise;
}

function overlayBoundaryScreenX(
  stageWidth: number,
  stageHeight: number,
  screenY: number,
  overlayScale: number,
  overlay: OverlayProfile,
) {
  const coverScale = Math.max(stageWidth / overlay.width, stageHeight / overlay.height);
  const offsetX = (stageWidth - overlay.width * coverScale) / 2;
  const offsetY = (stageHeight - overlay.height * coverScale) / 2;
  const overlayPreTransformY = stageHeight / 2 + (screenY - stageHeight / 2) / overlayScale;
  const sourceY = Math.max(
    0,
    Math.min(
      overlay.height - 1,
      Math.round((overlayPreTransformY - offsetY) / coverScale),
    ),
  );
  const sourceBoundaryX = overlay.opaqueRightByRow[sourceY];

  if (sourceBoundaryX === null || sourceBoundaryX === undefined) return null;

  const overlayPreTransformX = offsetX + sourceBoundaryX * coverScale;
  return stageWidth / 2 + (overlayPreTransformX - stageWidth / 2) * overlayScale;
}

function hiddenSpawnReport(scene: DesktopWaveScene, profiles: Map<string, AlphaProfile>, overlay: OverlayProfile) {
  return scene.waves.map((wave) => {
    const profile = wave.asset ? profiles.get(wave.asset) : undefined;
    if (!profile || wave.startTranslation === null) {
      return {
        id: wave.id,
        comparedRows: 0,
        hidden: false,
        paintedLeadingEdgeRatio: null,
        worstGapRatio: Number.NEGATIVE_INFINITY,
      };
    }

    const paintedLeadingEdgeX =
      wave.layoutLeft + wave.startTranslation + (profile.right / profile.width) * wave.width;
    let comparedRows = 0;
    let worstGapRatio = Number.POSITIVE_INFINITY;
    let limitingRow: { sourceY: number; screenY: number; boundaryX: number; leadingEdgeX: number } | null = null;

    for (const row of profile.rows) {
      const screenY = wave.layoutTop + (row.y / (profile.height - 1)) * wave.height;
      if (screenY < 0 || screenY > scene.stageHeight) continue;

      const boundaryX = overlayBoundaryScreenX(
        scene.stageWidth,
        scene.stageHeight,
        screenY,
        scene.overlayScale,
        overlay,
      );
      if (boundaryX === null) continue;

      const leadingEdgeX =
        wave.layoutLeft + wave.startTranslation + (row.right / profile.width) * wave.width;
      const gapRatio = (boundaryX - leadingEdgeX) / scene.stageWidth;
      comparedRows += 1;

      if (gapRatio < worstGapRatio) {
        worstGapRatio = gapRatio;
        limitingRow = { sourceY: row.y, screenY, boundaryX, leadingEdgeX };
      }
    }

    return {
      id: wave.id,
      comparedRows,
      hidden: comparedRows === 0 || worstGapRatio >= spawnSafetyFraction,
      paintedLeadingEdgeRatio: paintedLeadingEdgeX / scene.stageWidth,
      worstGapRatio,
      limitingRow,
    };
  });
}

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
    const waves = Array.from(element.querySelectorAll('[data-wave-device="desktop"] [data-wave-id]'));

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
      waveBoundaryReferences: waves.map((wave) =>
        getComputedStyle(wave).getPropertyValue('--wave-boundary-reference').trim(),
      ),
      waveHiddenSpawnInsets: waves.map((wave) =>
        getComputedStyle(wave).getPropertyValue('--wave-hidden-spawn-inset').trim(),
      ),
      waveAlphaLeadingEdges: waves.map((wave) =>
        getComputedStyle(wave).getPropertyValue('--wave-alpha-leading-edge').trim(),
      ),
      wavePaintedLeadingEdgeStarts: waves.map((wave) =>
        getComputedStyle(wave).getPropertyValue('--wave-painted-leading-edge-start').trim(),
      ),
      stageWidth: element.getBoundingClientRect().width,
      waveWidths: waves.map((wave) => getComputedStyle(wave).getPropertyValue('--wave-width').trim()),
      waveHeights: waves.map((wave) => getComputedStyle(wave).getPropertyValue('--wave-height').trim()),
      waveOpacities: waves.map((wave) => getComputedStyle(wave).getPropertyValue('--wave-opacity').trim()),
      waveStartTranslations: waves.map((wave) => {
        const animation = wave.getAnimations()[0];
        if (!(animation?.effect instanceof KeyframeEffect)) return null;
        const transform = animation.effect.getKeyframes()[0]?.transform;
        const width = wave.getBoundingClientRect().width;
        if (typeof transform !== 'string') return null;
        const expression = transform.match(/translate3d\(([^,]+)/)?.[1]?.replace(/\s+/g, '') ?? '';
        const terms = expression.match(/[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:%|px)/g) ?? [];
        return terms.length > 0
          ? terms.reduce((total, term) =>
              total + (term.endsWith('%') ? (Number.parseFloat(term) / 100) * width : Number.parseFloat(term)),
            0)
          : null;
      }),
      waveEndTranslations: waves.map((wave) => {
        const animation = wave.getAnimations()[0];
        if (!(animation?.effect instanceof KeyframeEffect)) return null;
        const keyframes = animation.effect.getKeyframes();
        const transform = keyframes[keyframes.length - 1]?.transform;
        const width = wave.getBoundingClientRect().width;
        if (typeof transform !== 'string') return null;
        const expression = transform.match(/translate3d\(([^,]+)/)?.[1]?.replace(/\s+/g, '') ?? '';
        const terms = expression.match(/[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:%|px)/g) ?? [];
        return terms.length > 0
          ? terms.reduce((total, term) =>
              total + (term.endsWith('%') ? (Number.parseFloat(term) / 100) * width : Number.parseFloat(term)),
            0)
          : null;
      }),
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
  expect(Math.min(...durationSeconds)).toBeLessThan(9);
  expect(Math.max(...durationSeconds)).toBeLessThan(17);
  expect(scene.waveBoundaryReferences.every((reference) => reference.endsWith('cqw'))).toBe(true);
  expect(scene.waveHiddenSpawnInsets.every((inset) => inset.endsWith('cqw'))).toBe(true);
  expect(scene.waveAlphaLeadingEdges.every((edge) => edge.endsWith('%'))).toBe(true);
  expect(scene.wavePaintedLeadingEdgeStarts.every((start) => start.includes('cqw'))).toBe(true);
  expect(scene.waveStartTokens.every((start) => start.includes('cqw') && start.includes('%'))).toBe(true);
  expect(scene.waveEndTokens.every((end) => end.endsWith('vw'))).toBe(true);
  const waveStartTranslations = scene.waveStartTranslations as number[];
  const waveEndTranslations = scene.waveEndTranslations as number[];
  expect(waveStartTranslations.every(Number.isFinite)).toBe(true);
  expect(waveEndTranslations.every(Number.isFinite)).toBe(true);
  expect(waveStartTranslations.every((start) => start < 0)).toBe(true);

  const waveProfiles = await getWaveProfiles();
  scene.waveAlphaLeadingEdges.forEach((edge, index) => {
    const asset = scene.waveAssets[index];
    const profile = asset ? waveProfiles.get(asset) : undefined;
    expect(profile).toBeDefined();
    expect(Math.abs(Number.parseFloat(edge) / 100 - profile!.right / profile!.width)).toBeLessThan(0.001);
  });

  const velocityReports = scene.waveIds.map((id, index) => {
    const start = waveStartTranslations[index];
    const end = waveEndTranslations[index];
    const duration = durationSeconds[index];
    const velocityVwPerSecond = (Math.abs(end - start) / duration / scene.stageWidth) * 100;

    return {
      id,
      duration,
      travelStageWidths: Math.abs(end - start) / scene.stageWidth,
      velocityVwPerSecond,
    };
  });

  console.log('Home layered wave velocity report', JSON.stringify(velocityReports, null, 2));
  expect(velocityReports.every((report) => Number.isFinite(report.velocityVwPerSecond))).toBe(true);
  expect(Math.min(...velocityReports.map((report) => report.velocityVwPerSecond))).toBeGreaterThanOrEqual(14);
  expect(Math.max(...velocityReports.map((report) => report.velocityVwPerSecond))).toBeLessThanOrEqual(24);
  expect(new Set(velocityReports.map((report) => report.velocityVwPerSecond)).size).toBe(renderedWaveCount);

  const broadUnderlayerVelocities = velocityReports
    .filter((report) => report.id?.includes('wave-07') || report.id?.includes('wave-08'))
    .map((report) => report.velocityVwPerSecond);
  const crossingWaveVelocities = velocityReports
    .filter((report) =>
      ['wave-03', 'wave-04', 'wave-05', 'wave-06'].some((family) => report.id?.includes(family)),
    )
    .map((report) => report.velocityVwPerSecond);
  const thickWaveVelocities = velocityReports
    .filter((report) => report.id?.includes('wave-01') || report.id?.includes('wave-02'))
    .map((report) => report.velocityVwPerSecond);
  expect(Math.max(...broadUnderlayerVelocities)).toBeLessThan(Math.min(...thickWaveVelocities));
  expect(Math.max(...broadUnderlayerVelocities)).toBeLessThan(Math.min(...crossingWaveVelocities));
  expect(scene.waveTransforms.every((transform) => transform !== 'none')).toBe(true);
  expect(scene.waveWidths.filter((width) => Number.parseFloat(width) > 165).length).toBe(6);
  expect(scene.waveHeights.filter((height) => Number.parseFloat(height) > 80).length).toBe(6);
  expect(Number.parseFloat(scene.waveOpacities[0])).toBe(1);
  expect(Number.parseFloat(scene.waveOpacities[1])).toBe(1);
  const dominantRibbonIndex = scene.waveIds.indexOf('wave-08-translucent-cream-ribbon');
  expect(dominantRibbonIndex).toBeGreaterThanOrEqual(0);
  expect(scene.waveBoundaryReferences[dominantRibbonIndex]).toBe('50cqw');
  expect(scene.waveHiddenSpawnInsets[dominantRibbonIndex]).toBe('5cqw');
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
    .locator('[data-wave-device="desktop"] [data-wave-id]')
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

test('Desktop wave reset is hidden beneath the overlay across representative aspect ratios', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop-only layered background coverage.');

  const desktopViewports = [
    { width: 1024, height: 768 },
    { width: 1280, height: 720 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ];
  const waveProfiles = await getWaveProfiles();
  const overlayProfile = await getOverlayProfile();
  const reports: Array<{
    viewport: (typeof desktopViewports)[number];
    scene: DesktopWaveScene;
    spawn: ReturnType<typeof hiddenSpawnReport>;
  }> = [];

  for (const viewport of desktopViewports) {
    await page.setViewportSize(viewport);
    await page.goto('/', { waitUntil: 'networkidle' });

    const scene = await page.locator('[data-home-layered-background]').evaluate((element) => {
      const elementRect = element.getBoundingClientRect();
      const overlay = element.querySelector('[data-layered-background-overlay]');
      const parseTranslation = (transform: unknown, width: number) => {
        if (typeof transform !== 'string') return null;
        const expression = transform.match(/translate3d\(([^,]+)/)?.[1]?.replace(/\s+/g, '') ?? '';
        const terms = expression.match(/[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:%|px)/g) ?? [];
        return terms.length > 0
          ? terms.reduce((total, term) =>
              total + (term.endsWith('%') ? (Number.parseFloat(term) / 100) * width : Number.parseFloat(term)),
            0)
          : null;
      };
      const overlayTransform = overlay instanceof HTMLElement ? getComputedStyle(overlay).transform : 'none';
      const overlayScaleMatch = overlayTransform.match(/^matrix(?:3d)?\(([+-]?[\d.]+)/);
      const waves = Array.from(element.querySelectorAll('[data-wave-device="desktop"] [data-wave-id]'));

      return {
        stageWidth: elementRect.width,
        stageHeight: elementRect.height,
        overlayScale: overlayScaleMatch ? Number(overlayScaleMatch[1]) : 1,
        waves: waves.map((wave) => {
          const animation = wave.getAnimations()[0];
          const keyframes = animation?.effect instanceof KeyframeEffect ? animation.effect.getKeyframes() : [];
          const parentRect = wave.parentElement?.getBoundingClientRect();
          const rect = wave.getBoundingClientRect();

          return {
            id: wave.getAttribute('data-wave-id'),
            asset: wave.getAttribute('data-wave-asset'),
            layoutLeft: (parentRect?.left ?? elementRect.left) - elementRect.left + (wave instanceof HTMLElement ? wave.offsetLeft : 0),
            layoutTop: (parentRect?.top ?? elementRect.top) - elementRect.top + (wave instanceof HTMLElement ? wave.offsetTop : 0),
            width: rect.width,
            height: rect.height,
            startTranslation: parseTranslation(keyframes[0]?.transform, rect.width),
            endTranslation: parseTranslation(keyframes[keyframes.length - 1]?.transform, rect.width),
            durationSeconds: Number.parseFloat(getComputedStyle(wave).animationDuration),
          };
        }),
      };
    });

    const spawn = hiddenSpawnReport(scene, waveProfiles, overlayProfile);
    console.log(
      `Home layered wave hidden-spawn report ${viewport.width}x${viewport.height}`,
      JSON.stringify(
        spawn.map(({ id, comparedRows, hidden, paintedLeadingEdgeRatio, worstGapRatio, limitingRow }) => ({
          id,
          comparedRows,
          hidden,
          paintedLeadingEdgeRatio,
          worstGapRatio,
          limitingRow,
        })),
        null,
        2,
      ),
    );
    reports.push({ viewport, scene, spawn });
  }

  reports.forEach(({ viewport, scene, spawn }) => {
    expect(scene.overlayScale, `${viewport.width}x${viewport.height} overlay scale`).toBeCloseTo(1.04, 2);
    expect(scene.waves).toHaveLength(renderedWaveCount);
    expect(scene.waves.every((wave) => wave.startTranslation !== null && wave.startTranslation < 0)).toBe(true);
    expect(
      scene.waves.every((wave) => {
        const profile = wave.asset ? waveProfiles.get(wave.asset) : undefined;
        if (!profile || wave.endTranslation === null) return false;
        const endLeadingEdge =
          wave.layoutLeft + wave.endTranslation + (profile.right / profile.width) * wave.width;
        return endLeadingEdge / scene.stageWidth > 1;
      }),
    ).toBe(true);

    spawn.forEach((wave) => {
      expect(wave.hidden, `${viewport.width}x${viewport.height} ${wave.id} hidden reset`).toBe(true);
      expect(wave.paintedLeadingEdgeRatio, `${viewport.width}x${viewport.height} ${wave.id} leading edge`).toBeGreaterThan(0.4);
      expect(wave.paintedLeadingEdgeRatio, `${viewport.width}x${viewport.height} ${wave.id} leading edge`).toBeLessThan(0.6);
      if (wave.comparedRows > 0) {
        expect(wave.worstGapRatio, `${viewport.width}x${viewport.height} ${wave.id} safety margin`).toBeGreaterThanOrEqual(
          spawnSafetyFraction,
        );
      }
    });
  });
});

test('Desktop reduced motion keeps the dense layered composition static', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop-only layered background coverage.');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'networkidle' });

  const reducedState = await page.locator('[data-home-layered-background]').evaluate((element) => {
    const base = element.querySelector('.home-layered-background__base img');
    const overlay = element.querySelector('[data-layered-background-overlay]');
    const waves = Array.from(element.querySelectorAll('[data-wave-device="desktop"] [data-wave-id]'));

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
    .locator('[data-wave-device="desktop"] [data-wave-id]')
    .evaluateAll((waves) => waves.map((wave) => getComputedStyle(wave).transform));
  expect(laterTransforms).toEqual(reducedState.waveTransforms);
});

test('Mobile uses the portrait layered base, shared waves, and foreground overlay', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile-'), 'Mobile-only layered background coverage.');

  const requests: string[] = [];
  page.on('request', (request) => requests.push(requestedPath(request.url())));

  await page.goto('/', { waitUntil: 'networkidle' });

  const mobileState = await page.locator('[data-home-layered-background]').evaluate((element) => {
    const base = element.querySelector('.home-layered-background__base img');
    const desktopWaveLayer = element.querySelector('[data-wave-device="desktop"]');
    const mobileWaves = Array.from(
      element.querySelectorAll('[data-wave-device="mobile"] [data-wave-id]'),
    );
    const overlay = element.querySelector('[data-layered-background-overlay]');
    const mobileWaveStyles = mobileWaves.map((wave) => getComputedStyle(wave));

    return {
      baseCurrentSrc: base instanceof HTMLImageElement ? new URL(base.currentSrc).pathname : null,
      baseObjectFit: base instanceof HTMLImageElement ? getComputedStyle(base).objectFit : '',
      baseObjectPosition: base instanceof HTMLImageElement ? getComputedStyle(base).objectPosition : '',
      desktopWaveDisplay: desktopWaveLayer instanceof HTMLElement ? getComputedStyle(desktopWaveLayer).display : '',
      mobileWaveCount: mobileWaves.length,
      mobileWaveIds: mobileWaves.map((wave) => wave.getAttribute('data-wave-id')),
      mobileWaveAssets: mobileWaves.map((wave) => wave.getAttribute('data-wave-asset')),
      mobileWaveFamilies: mobileWaves.map((wave) => wave.getAttribute('data-wave-family')),
      mobileWaveBackgrounds: mobileWaveStyles.map((styles) => styles.backgroundImage),
      mobileWaveDisplays: mobileWaveStyles.map((styles) => styles.display),
      mobileWaveAnimationNames: mobileWaveStyles.map((styles) => styles.animationName),
      mobileWaveTimingFunctions: mobileWaveStyles.map((styles) => styles.animationTimingFunction),
      mobileWaveIterationCounts: mobileWaveStyles.map((styles) => styles.animationIterationCount),
      mobileWaveOpacities: mobileWaveStyles.map((styles) => styles.opacity),
      mobileWaveDurations: mobileWaveStyles.map((styles) => styles.animationDuration),
      mobileWaveTransforms: mobileWaveStyles.map((styles) => styles.transform),
      mobileWaveWidths: mobileWaveStyles.map((styles) => styles.getPropertyValue('--wave-width').trim()),
      mobileWaveHeights: mobileWaveStyles.map((styles) => styles.getPropertyValue('--wave-height').trim()),
      mobileWaveZIndexes: mobileWaveStyles.map((styles) => styles.zIndex),
      overlayDisplay: overlay instanceof HTMLElement ? getComputedStyle(overlay).display : '',
      overlayBackground: overlay instanceof HTMLElement ? getComputedStyle(overlay).backgroundImage : '',
      overlaySize: overlay instanceof HTMLElement ? getComputedStyle(overlay).backgroundSize : '',
      overlayZIndex: overlay instanceof HTMLElement ? getComputedStyle(overlay).zIndex : '',
      frameExperimentNodes: element.querySelectorAll('[data-home-frame]').length,
    };
  });

  expect(mobileState.baseCurrentSrc).toBe(mobileBasePath);
  expect(mobileState.baseObjectFit).toBe('cover');
  expect(mobileState.baseObjectPosition).toBe('50% 50%');
  expect(mobileState.desktopWaveDisplay).toBe('none');
  expect(mobileState.mobileWaveCount).toBe(renderedMobileWaveCount);
  const activeMobileWaveAssets = mobileState.mobileWaveAssets.filter(
    (path): path is string => path !== null,
  );
  const activeMobileWaveFamilies = mobileState.mobileWaveFamilies.filter(
    (family): family is string => family !== null,
  );
  expect(new Set(activeMobileWaveAssets)).toEqual(new Set(mobileWaveAssetPaths));
  expect(activeMobileWaveAssets.every((path) => path.includes('white'))).toBe(true);
  expect(activeMobileWaveAssets.some((path) => supersededMobileWavePaths.includes(path))).toBe(false);
  expect(new Set(activeMobileWaveFamilies)).toEqual(new Set(wavePaths.map((_, index) => `wave-0${index + 1}`)));
  const mobileWaveFamilyCounts = new Map<string, number>();
  for (const family of activeMobileWaveFamilies) {
    mobileWaveFamilyCounts.set(family, (mobileWaveFamilyCounts.get(family) ?? 0) + 1);
  }
  for (const [family, count] of expectedMobileSmallWaveFamilyCounts) {
    expect(mobileWaveFamilyCounts.get(family)).toBe(count);
  }
  expect(mobileState.mobileWaveBackgrounds.every((background) =>
    mobileWaveAssetPaths.some((path) => background.includes(path)),
  )).toBe(true);
  expect(mobileState.mobileWaveDisplays).toEqual(Array(renderedMobileWaveCount).fill('block'));
  expect(mobileState.mobileWaveAnimationNames).toEqual(
    Array(renderedMobileWaveCount).fill('home-layered-wave-travel'),
  );
  expect(mobileState.mobileWaveTimingFunctions).toEqual(Array(renderedMobileWaveCount).fill('linear'));
  expect(mobileState.mobileWaveIterationCounts).toEqual(Array(renderedMobileWaveCount).fill('infinite'));
  const mobileWaveOpacityById = new Map(
    mobileState.mobileWaveIds.map((id, index) => [id, mobileState.mobileWaveOpacities[index]]),
  );
  expect(mobileWaveOpacityById.get('mobile-wave-01-upper')).toBe('1');
  expect(mobileWaveOpacityById.get('mobile-wave-01-middle')).toBe('0.72');
  expect(mobileWaveOpacityById.get('mobile-wave-02-lower')).toBe('1');
  expect(mobileWaveOpacityById.get('mobile-wave-02-middle')).toBe('0.72');
  expect(mobileWaveOpacityById.get('mobile-wave-08-upper')).toBe('0.42');
  expect(mobileWaveOpacityById.get('mobile-wave-08-lower')).toBe('0.28');
  expect(mobileWaveOpacityById.get('mobile-wave-08-middle')).toBe('0.24');
  expect(mobileWaveOpacityById.get('mobile-wave-08-deep')).toBe('0.2');
  expect(mobileState.mobileWaveTransforms.every((transform) => transform !== 'none')).toBe(true);
  expect(mobileState.mobileWaveDurations.every((duration) => {
    const seconds = Number.parseFloat(duration);
    return seconds >= 4 && seconds <= 8;
  })).toBe(true);
  expect(mobileState.mobileWaveWidths.every((width) => width.endsWith('%'))).toBe(true);
  expect(mobileState.mobileWaveHeights.every((height) => height.endsWith('%'))).toBe(true);
  expect(mobileState.mobileWaveZIndexes.every((zIndex) => Number.parseInt(zIndex, 10) < 20)).toBe(true);
  expect(mobileState.overlayDisplay).toBe('block');
  expect(mobileState.overlayBackground).toContain(mobileOverlayPath);
  expect(mobileState.overlaySize).toBe('cover');
  expect(mobileState.overlayZIndex).toBe('20');
  expect(mobileState.frameExperimentNodes).toBe(0);

  for (const path of mobileLayeredPaths) {
    expect(requests).toContain(path);
  }
  for (const path of desktopLayeredPaths.slice(0, 2)) {
    expect(requests).not.toContain(path);
  }
  expect(requests).not.toContain(frameAPath);
  expect(requests).not.toContain('/assets/home/background/home-probability-field-frame-b-v1.png');
  expect(requests).not.toContain('/assets/home/background/home-probability-field-frame-c-v1.png');
  expect(requests.filter((path) => path.startsWith('/assets/home/mobile-layered/'))).toEqual([
    mobileBasePath,
    mobileOverlayPath,
  ]);
});

test('Mobile reduced motion keeps the layered composition static', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile-'), 'Mobile-only reduced-motion coverage.');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'networkidle' });

  const reducedState = await page.locator('[data-home-layered-background]').evaluate((element) => {
    const mobileWaves = Array.from(
      element.querySelectorAll('[data-wave-device="mobile"] [data-wave-id]'),
    );
    const desktopWaveLayer = element.querySelector('[data-wave-device="desktop"]');
    const overlay = element.querySelector('[data-layered-background-overlay]');
    const base = element.querySelector('.home-layered-background__base img');

    return {
      baseCurrentSrc: base instanceof HTMLImageElement ? new URL(base.currentSrc).pathname : null,
      desktopWaveDisplay: desktopWaveLayer instanceof HTMLElement ? getComputedStyle(desktopWaveLayer).display : '',
      mobileWaveDisplays: mobileWaves.map((wave) => getComputedStyle(wave).display),
      mobileWaveAnimationNames: mobileWaves.map((wave) => getComputedStyle(wave).animationName),
      mobileWaveAnimations: mobileWaves.map((wave) => wave.getAnimations().length),
      mobileWaveTransforms: mobileWaves.map((wave) => getComputedStyle(wave).transform),
      overlayDisplay: overlay instanceof HTMLElement ? getComputedStyle(overlay).display : '',
      overlayBackground: overlay instanceof HTMLElement ? getComputedStyle(overlay).backgroundImage : '',
    };
  });

  expect(reducedState.baseCurrentSrc).toBe(mobileBasePath);
  expect(reducedState.desktopWaveDisplay).toBe('none');
  expect(reducedState.mobileWaveDisplays).toEqual(Array(renderedMobileWaveCount).fill('block'));
  expect(reducedState.mobileWaveAnimationNames).toEqual(Array(renderedMobileWaveCount).fill('none'));
  expect(reducedState.mobileWaveAnimations).toEqual(Array(renderedMobileWaveCount).fill(0));
  expect(reducedState.mobileWaveTransforms.every((transform) => transform !== 'none')).toBe(true);
  expect(reducedState.overlayDisplay).toBe('block');
  expect(reducedState.overlayBackground).toContain(mobileOverlayPath);

  await page.waitForTimeout(120);
  const laterTransforms = await page
    .locator('[data-wave-device="mobile"] [data-wave-id]')
    .evaluateAll((waves) => waves.map((wave) => getComputedStyle(wave).transform));
  expect(laterTransforms).toEqual(reducedState.mobileWaveTransforms);
});
