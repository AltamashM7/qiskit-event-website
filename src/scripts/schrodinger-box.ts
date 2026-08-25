const initializeSchrodingerBox = () => {
  const box = document.querySelector<HTMLElement>('[data-schrodinger-box]');

  if (!box || box.dataset.initialized === 'true') {
    return;
  }

  box.dataset.initialized = 'true';

  let hoverActive = false;
  let focusActive = false;

  const updateState = () => {
    const locked = box.dataset.locked === 'true';
    const revealed = locked || hoverActive || focusActive;

    box.dataset.revealed = String(revealed);
    box.setAttribute('aria-pressed', String(locked));
  };

  const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (finePointerQuery.matches) {
    box.addEventListener('pointerenter', () => {
      hoverActive = true;
      updateState();
    });

    box.addEventListener('pointerleave', () => {
      hoverActive = false;
      updateState();
    });
  }

  box.addEventListener('focusin', () => {
    focusActive = true;
    updateState();
  });

  box.addEventListener('focusout', (event) => {
    const nextTarget = event.relatedTarget;
    focusActive = nextTarget instanceof Node && box.contains(nextTarget);
    updateState();
  });

  box.addEventListener('click', () => {
    if (!finePointerQuery.matches) {
      focusActive = false;
    }

    box.dataset.locked = String(box.dataset.locked !== 'true');
    updateState();
  });

  updateState();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSchrodingerBox, { once: true });
} else {
  initializeSchrodingerBox();
}
