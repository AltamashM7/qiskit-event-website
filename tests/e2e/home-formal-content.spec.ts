import { expect, test } from '@playwright/test';

const registrationHref = 'https://example.com/registration';
const approvedFormalAssets = [
  '/assets/formal/fall-fest/fall-fest-birds-v1.svg',
  '/assets/formal/fall-fest/fall-fest-quantum-infinity-v1.svg',
  '/assets/formal/fall-fest/fall-fest-quantum-wave-v1.svg',
];

test('Home formal content follows the approved static editorial contracts', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const stageAndFormalOrder = await page.locator('#home-stage, [data-formal-shell]').evaluateAll((elements) =>
    elements.map((element) => (element.id === 'home-stage' ? 'home-stage' : 'formal-shell')),
  );
  expect(stageAndFormalOrder).toEqual(['home-stage', 'formal-shell']);

  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  const formal = page.locator('[data-formal-content]');
  await expect(formal.getByRole('heading', { level: 2 })).toHaveText([
    'Event Snapshot',
    'About the Event',
    "What You'll Do",
    'Program Preview',
    'Speakers Preview',
    'Organizers & Registration',
  ]);

  await expect(formal.locator('[data-event-snapshot] dt')).toHaveText([
    'LOCATION',
    'FORMAT',
    'AUDIENCE',
  ]);
  await expect(formal.locator('[data-event-snapshot] .formal-snapshot__date-main')).toContainText('15—17');
  await expect(formal.locator('[data-event-snapshot] .formal-snapshot__date-meta strong')).toHaveText([
    'OCT',
    '2026',
  ]);
  await expect(formal.locator(`a[href="${registrationHref}"]`)).toHaveCount(2);
  await expect(formal.locator('[data-formal-schedule-preview] [data-schedule-entry]')).toHaveCount(3);
  await expect(formal.locator('[data-formal-schedule-preview] + .formal-text-link')).toHaveAttribute(
    'href',
    '/schedule/',
  );
  await expect(formal.locator('[data-formal-speaker-preview] [data-speaker-entry]')).toHaveCount(3);
  await expect(formal.locator('[data-formal-speaker-preview] + .formal-text-link')).toHaveAttribute(
    'href',
    '/speakers/',
  );
  const formalAssetUrls = await formal.locator('img').evaluateAll((images) =>
    images.map((image) => image.getAttribute('src')).filter((src): src is string => Boolean(src)),
  );
  expect(formalAssetUrls.sort()).toEqual([...approvedFormalAssets].sort());
  expect(formalAssetUrls.every((src) => !/(logo|wordmark|badge|hero|ibm|qiskit)/i.test(src))).toBe(true);
  await expect(page.locator(`#home-stage img[src^="/assets/formal/"]`)).toHaveCount(0);

  const formalAssetResponses = await Promise.all(approvedFormalAssets.map((asset) => page.request.get(asset)));
  expect(formalAssetResponses.every((response) => response.ok())).toBe(true);

  const licenseResponse = await page.request.get('/licenses/qiskit-fall-fest-materials.txt');
  expect(licenseResponse.ok()).toBe(true);
  const licenseText = await licenseResponse.text();
  expect(licenseText).toContain('MIT License');
  expect(licenseText).toContain('Copyright (c) 2026 Qiskit Fall Fest 2026');

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);

  const snapshotBounds = await formal.locator('[data-event-snapshot]').evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return { right: bounds.right, viewportWidth: document.documentElement.clientWidth };
  });
  expect(snapshotBounds.right).toBeLessThanOrEqual(snapshotBounds.viewportWidth + 0.5);

  const continuousAnimations = await formal.evaluate((root) =>
    Array.from(root.querySelectorAll<HTMLElement>('*')).filter((element) => {
      const styles = getComputedStyle(element);
      return styles.animationName !== 'none' && styles.animationIterationCount === 'infinite';
    }).length,
  );
  expect(continuousAnimations).toBe(0);
});

test('Home formal links lead to the technical Schedule and Speakers shells', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-formal-speaker-preview] + .formal-text-link').click();
  await expect(page).toHaveURL(/\/speakers\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Speakers');
  await expect(page.getByRole('navigation', { name: 'Primary' }).locator('[aria-current="page"]')).toHaveText(
    'Speakers',
  );

  await page.goto('/');
  await page.locator('[data-formal-schedule-preview] + .formal-text-link').click();
  await expect(page).toHaveURL(/\/schedule\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Schedule');
  await expect(page.getByRole('navigation', { name: 'Primary' }).locator('[aria-current="page"]')).toHaveText(
    'Schedule',
  );
});
