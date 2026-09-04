const previewAlias = process.argv[2]?.trim();

if (!previewAlias) {
  throw new Error('A Cloudflare preview alias URL is required.');
}

const baseUrl = new URL(previewAlias);
if (baseUrl.protocol !== 'https:') {
  throw new Error(`Expected an HTTPS preview alias URL, received ${baseUrl.href}`);
}

const checks = [
  { path: '/', kind: 'page' },
  { path: '/__qa/home-desktop-closed.png', kind: 'image' },
  { path: '/__qa/home-desktop-reveal.png', kind: 'image' },
  { path: '/__qa/home-mobile-closed.png', kind: 'image' },
  { path: '/__qa/home-mobile-reveal.png', kind: 'image' },
  { path: '/__qa/home-mobile-compact-closed.png', kind: 'image' },
  { path: '/__qa/home-mobile-compact-reveal.png', kind: 'image' },
  { path: '/__qa/home-formal-desktop.png', kind: 'image' },
  { path: '/__qa/home-formal-mobile.png', kind: 'image' },
  { path: '/__qa/home-formal-compact.png', kind: 'image' },
  { path: '/schedule/', kind: 'page' },
  { path: '/speakers/', kind: 'page' },
];

const pngSignature = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10]);
const retryableStatuses = new Set([408, 425, 429, 500, 502, 503, 504, 522, 523, 524]);
const maxAttempts = 12;
const retryDelayMs = 5000;

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

for (const check of checks) {
  const url = new URL(check.path, baseUrl);
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    let response;

    try {
      response = await fetch(url);
    } catch (error) {
      lastError = error;
      if (attempt >= maxAttempts) {
        break;
      }

      console.log(`${check.path}: transient fetch error; retrying (${attempt}/${maxAttempts - 1})`);
      await delay(retryDelayMs);
      continue;
    }

    const body = new Uint8Array(await response.arrayBuffer());
    if (!response.ok) {
      lastError = new Error(`${check.path} returned HTTP ${response.status}`);
      if (!retryableStatuses.has(response.status)) {
        break;
      }

      if (attempt < maxAttempts) {
        console.log(`${check.path}: transient preview response; retrying (${attempt}/${maxAttempts - 1})`);
        await delay(retryDelayMs);
      }
      continue;
    }

    if (body.length === 0) {
      throw new Error(`${check.path} returned an empty response body`);
    }

    const contentType = response.headers.get('content-type') ?? 'unknown';
    if (check.kind === 'image') {
      const isPng = pngSignature.every((byte, index) => body[index] === byte);
      if (!contentType.toLowerCase().includes('image/png') || !isPng) {
        throw new Error(`${check.path} is not a valid PNG image (${contentType})`);
      }
    }

    console.log(`${check.path}: HTTP ${response.status} ${contentType}`);
    lastError = undefined;
    break;
  }

  if (lastError) {
    throw lastError;
  }
}
