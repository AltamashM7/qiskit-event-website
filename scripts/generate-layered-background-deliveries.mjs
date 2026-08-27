import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptsDirectory, "..");
const layeredRoot = path.join(
  repositoryRoot,
  "public",
  "assets",
  "home",
  "background",
  "layered",
);

const webpQuality = {
  quality: 95,
  effort: 6,
  smartSubsample: true,
};

const alphaWebpQuality = {
  ...webpQuality,
  alphaQuality: 100,
};

const deliveryJobs = [
  {
    source: [
      "masters",
      "desktop",
      "base",
      "home-probability-field-base-desktop-master.png",
    ],
    destination: [
      "web",
      "desktop",
      "base",
      "home-probability-field-base-desktop.webp",
    ],
    options: webpQuality,
  },
  {
    source: [
      "masters",
      "desktop",
      "overlay",
      "home-probability-field-overlay-desktop-master.png",
    ],
    destination: [
      "web",
      "desktop",
      "overlay",
      "home-probability-field-overlay-desktop.webp",
    ],
    options: alphaWebpQuality,
  },
  ...[
    "wave-01-thick-cream-upper",
    "wave-02-thick-cream-lower",
    "wave-03-thin-yellow",
    "wave-04-thin-ivory",
    "wave-05-dashed-white-upper",
    "wave-06-dashed-white-lower",
    "wave-07-halftone-yellow-band",
    "wave-08-translucent-cream-ribbon",
  ].map((name) => ({
    source: ["masters", "desktop", "waves", `${name}-master.png`],
    destination: ["web", "desktop", "waves", `${name}.webp`],
    options: alphaWebpQuality,
  })),
];

for (const job of deliveryJobs) {
  const sourcePath = path.join(layeredRoot, ...job.source);
  const destinationPath = path.join(layeredRoot, ...job.destination);

  await fs.mkdir(path.dirname(destinationPath), { recursive: true });

  const source = sharp(sourcePath);
  const sourceMetadata = await source.metadata();
  await source.webp(job.options).toFile(destinationPath);

  const outputMetadata = await sharp(destinationPath).metadata();
  const outputStats = await fs.stat(destinationPath);

  if (
    sourceMetadata.width !== outputMetadata.width ||
    sourceMetadata.height !== outputMetadata.height
  ) {
    throw new Error(
      `Dimension mismatch for ${job.destination.join("/")}: ` +
        `${sourceMetadata.width}x${sourceMetadata.height} -> ` +
        `${outputMetadata.width}x${outputMetadata.height}`,
    );
  }

  console.log(
    `${job.destination.join("/")}: ${outputStats.size} bytes, ` +
      `${outputMetadata.width}x${outputMetadata.height}, ` +
      `${outputMetadata.hasAlpha ? "RGBA" : "RGB"} WebP`,
  );
}
