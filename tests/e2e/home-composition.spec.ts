import { test, expect } from '@playwright/test';

const boxName = "Schrödinger's box";

test('Home starts closed with the approved shared-composition layers', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const box = page.getByRole('button', { name: boxName });
  await expect(box).toBeVisible();
  await expect(box).toHaveAttribute('aria-pressed', 'false');
  await expect(box).toHaveAttribute('data-revealed', 'false');
  await expect(box.locator('.schrodinger-box__state--closed')).toHaveCSS('opacity', '1');
  await expect(box.locator('.schrodinger-box__state--reveal')).toHaveCSS('opacity', '0');

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

test('Box uses simple two-endpoint idle motion and a calmer phase-split transition', async ({ page }) => {
  await page.goto('/');

  const motion = await page.getByRole('button', { name: boxName }).evaluate((element) => {
    const state = (selector: string) => {
      const stateElement = element.querySelector<HTMLElement>(selector);
      if (!stateElement) return null;
      const styles = getComputedStyle(stateElement);
      return {
        opacity: styles.opacity,
        transform: styles.transform,
        transitionProperty: styles.transitionProperty,
        transitionDuration: styles.transitionDuration,
        transitionTimingFunction: styles.transitionTimingFunction,
      };
    };

    const keyframes = Array.from(document.styleSheets).flatMap((sheet) => {
      try {
        return Array.from(sheet.cssRules);
      } catch {
        return [];
      }
    }).flatMap((rule) => {
      if (!(rule instanceof CSSKeyframesRule) || rule.name !== 'home-box-float') return [];
      return Array.from(rule.cssRules)
        .filter((keyframe): keyframe is CSSKeyframeRule => keyframe instanceof CSSKeyframeRule)
        .map((keyframe) => ({
          offset: keyframe.keyText,
          properties: Array.from(keyframe.style).sort(),
          transform: keyframe.style
            .getPropertyValue('transform')
            .replace(/^translate3d\(([^,]+),\s*([^,]+),\s*0\)/, 'translate($1, $2)')
            .replaceAll('0px', '0'),
        }));
    });

    const styles = getComputedStyle(element);
    const rules = Array.from(document.styleSheets).flatMap((sheet) => {
      try {
        return Array.from(sheet.cssRules);
      } catch {
        return [];
      }
    });
    const authoredTransform = (matches: (selector: string) => boolean) => {
      const matchingRule = rules.find((rule) =>
        rule instanceof CSSStyleRule && matches(rule.selectorText),
      );
      return matchingRule instanceof CSSStyleRule
        ? matchingRule.style.getPropertyValue('transform')
            .replace(/^translate3d\(([^,]+),\s*([^,]+),\s*0\)/, 'translate($1, $2)')
            .replaceAll('0px', '0')
        : null;
    };

    return {
      animationName: styles.animationName,
      animationDuration: styles.animationDuration,
      animationTimingFunction: styles.animationTimingFunction,
      animationIterationCount: styles.animationIterationCount,
      animationDirection: styles.animationDirection,
      closed: state('.schrodinger-box__state--closed'),
      reveal: state('.schrodinger-box__state--reveal'),
      keyframes,
      stateTransforms: {
        closedResting: authoredTransform((selector) => selector === '.schrodinger-box__state--closed'),
        revealStarting: authoredTransform((selector) => selector === '.schrodinger-box__state--reveal'),
        closedLeaving: authoredTransform((selector) =>
          selector.includes('[data-revealed') && selector.includes('__state--closed'),
        ),
        revealSettled: authoredTransform((selector) =>
          selector.includes('[data-revealed') && selector.includes('__state--reveal'),
        ),
      },
    };
  });

  expect(motion.animationName).toBe('home-box-float');
  expect(motion.animationDuration).toBe('3.1s');
  expect(motion.animationTimingFunction).toBe('ease-in-out');
  expect(motion.animationIterationCount).toBe('infinite');
  expect(motion.animationDirection).toBe('alternate');
  expect(motion.closed).not.toBeNull();
  expect(motion.reveal).not.toBeNull();
  expect(motion.closed!.transitionProperty).toBe('transform, opacity');
  expect(motion.closed!.transitionDuration).toBe('0.64s, 0.64s');
  expect(motion.closed!.transitionTimingFunction).toBe(
    'cubic-bezier(0.22, 0.61, 0.36, 1), cubic-bezier(0.22, 0.61, 0.36, 1)',
  );
  expect(motion.reveal!.transform).not.toBe('none');
  expect(motion.keyframes).toHaveLength(2);
  expect(motion.keyframes.map((keyframe) => keyframe.properties)).toEqual([
    ['transform'],
    ['transform'],
  ]);
  expect(motion.keyframes.map((keyframe) => keyframe.offset)).toEqual([
    '0%',
    '100%',
  ]);
  expect(motion.keyframes.map((keyframe) => keyframe.transform)).toEqual([
    'translate(0.04rem, -0.08rem) rotate(-0.35deg)',
    'translate(-0.04rem, -0.92rem) rotate(0.45deg)',
  ]);
  expect(new Set(motion.keyframes.map((keyframe) => keyframe.transform)).size).toBe(2);
  expect(motion.stateTransforms).toEqual({
    closedResting: 'translate(0, 0) scale(1)',
    revealStarting: 'translate(0.65%, -0.65%) scale(1.006)',
    closedLeaving: 'translate(-0.65%, 0.65%) scale(0.995)',
    revealSettled: 'translate(0, 0) scale(1)',
  });

  const revealImageTransform = await page
    .getByRole('button', { name: boxName })
    .locator('.schrodinger-box__image--reveal')
    .evaluate((image) => {
      const matchingRule = Array.from(document.styleSheets).flatMap((sheet) => {
        try {
          return Array.from(sheet.cssRules);
        } catch {
          return [];
        }
      }).find((rule) =>
        rule instanceof CSSStyleRule &&
        rule.selectorText.includes('.schrodinger-box__image--reveal') &&
        !rule.selectorText.includes('[data-revealed'),
      );

      return {
        computed: getComputedStyle(image).transform,
        authored: matchingRule instanceof CSSStyleRule
          ? matchingRule.style.getPropertyValue('transform')
          : null,
      };
    });

  expect(revealImageTransform.authored).toBe(
    'translate(0.99307%, 1.68%) scale(0.953033, 0.951307)',
  );
  expect(revealImageTransform.computed).not.toBe('none');

  await page.getByRole('button', { name: boxName }).click({ force: true });
  await expect(page.getByRole('button', { name: boxName })).toHaveAttribute('data-revealed', 'true');
  await expect(page.getByRole('button', { name: boxName }).locator('.schrodinger-box__state--closed')).toHaveCSS(
    'opacity',
    '0',
  );
  await expect(page.getByRole('button', { name: boxName }).locator('.schrodinger-box__state--reveal')).toHaveCSS(
    'opacity',
    '1',
  );
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

  const box = page.getByRole('button', { name: boxName });
  const animationName = await box.evaluate((element) => getComputedStyle(element).animationName);
  const stateMotion = await box.evaluate((element) =>
    ['.schrodinger-box__state--closed', '.schrodinger-box__state--reveal'].map((selector) => {
      const state = element.querySelector<HTMLElement>(selector);
      if (!state) return null;
      const styles = getComputedStyle(state);
      return {
        transform: styles.transform,
        transitionProperty: styles.transitionProperty,
        transitionDuration: styles.transitionDuration,
      };
    }),
  );

  expect(animationName).toBe('none');
  expect(stateMotion).toEqual([
    { transform: 'none', transitionProperty: 'opacity', transitionDuration: '0.12s' },
    { transform: 'none', transitionProperty: 'opacity', transitionDuration: '0.12s' },
  ]);
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
      backgroundPosition: getComputedStyle(
        document.querySelector('.home-stage__background-art img') as HTMLImageElement,
      ).objectPosition,
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
  expect(geometry.backgroundPosition).toBe('50% 50%');
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

test('Home title words keep matching contrasting backing treatments', async ({ page }) => {
  await page.goto('/');

  const titleWords = await page.locator('.home-stage__title > span').evaluateAll((words) =>
    words.map((word) => {
      const styles = getComputedStyle(word);
      return {
        text: word.textContent?.trim() ?? '',
        stroke: styles.getPropertyValue('-webkit-text-stroke'),
        shadow: styles.textShadow,
      };
    }),
  );

  expect(titleWords.map(({ text }) => text)).toEqual(['Qiskit', 'Event']);
  expect(titleWords[0]?.stroke).toContain('rgb(247, 247, 245)');
  expect(titleWords[0]?.shadow).toContain('rgb(247, 247, 245)');
  expect(titleWords[1]?.stroke).toContain('rgb(17, 24, 32)');
  expect(titleWords[1]?.shadow).toContain('rgb(17, 24, 32)');
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
