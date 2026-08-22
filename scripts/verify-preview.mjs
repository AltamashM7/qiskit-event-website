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
  { path: '/about-event/', kind: 'page' },
  { path: '/about-quantum-mechanics/', kind: 'page' },
];

const pngSignature = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10]);

for (const check of checks) {
  const url = new URL(check.path, baseUrl);
  const response = await fetch(url);
  const body = new Uint8Array(await response.arrayBuffer());

  if (!response.ok) {
    throw new Error(`${check.path} returned HTTP ${response.status}`);
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
}
