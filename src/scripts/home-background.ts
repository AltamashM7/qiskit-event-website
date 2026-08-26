const background = document.querySelector<HTMLElement>('[data-home-background]');
const frameImages = background
  ? Array.from(background.querySelectorAll<HTMLImageElement>('.home-stage__background-frame'))
  : [];
const continuationFrames = frameImages.slice(1);

async function waitForImageDecode(image: HTMLImageElement) {
  if (!image.complete) {
    await new Promise<void>((resolve, reject) => {
      image.addEventListener('load', () => resolve(), { once: true });
      image.addEventListener('error', () => reject(new Error('Home background frame failed to load.')), {
        once: true,
      });
    });
  }

  if (image.naturalWidth === 0) {
    throw new Error('Home background frame has no decoded pixels.');
  }

  if (typeof image.decode === 'function') {
    await image.decode();
  }
}

if (background && continuationFrames.length === 2) {
  void Promise.all(continuationFrames.map(waitForImageDecode))
    .then(() => {
      background.dataset.backgroundReady = 'true';
    })
    .catch(() => {
      // Keep Frame A as the safe static fallback if a continuation frame fails.
    });
}
