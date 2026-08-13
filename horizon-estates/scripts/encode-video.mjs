// Regenerates public/hero-still.mp4 and public/hero-scrub.mp4 from the original
// CloudFront sources.
//
// The scrub video MUST be encoded all-keyframe (-g 1 -keyint_min 1 -sc_threshold 0).
// The 4K originals average ~346ms per seek even when fully buffered, because each
// seek re-decodes from a distant keyframe — that caps scroll scrubbing at ~4.5fps
// no matter how the Hero component is written. All-keyframe makes every frame
// independently decodable, so seeks are effectively free.
//
// Usage: npm run encode:video

import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import ffmpeg from 'ffmpeg-static';

const SOURCES = {
  still:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260625_174131_395bc785-bb21-4e65-abf6-27c56f0764b6.mp4',
  scrub:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260624_055914_ee2b3b56-9a58-4885-989e-5b72a68b630d.mp4',
};

const WIDTH = 1600;
const CRF = 24;

const work = join(tmpdir(), 'horizon-estates-encode');
mkdirSync(work, { recursive: true });
mkdirSync('public', { recursive: true });

async function download(url, dest) {
  if (existsSync(dest)) return dest;
  console.log(`downloading ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  const { writeFile } = await import('node:fs/promises');
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
  return dest;
}

function encode(input, output, extraArgs) {
  console.log(`encoding ${output}`);
  execFileSync(
    ffmpeg,
    [
      '-hide_banner', '-loglevel', 'error', '-y',
      '-i', input,
      '-vf', `scale=${WIDTH}:-2`,
      '-c:v', 'libx264',
      '-crf', String(CRF),
      '-preset', 'slow',
      ...extraArgs,
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      '-an',
      output,
    ],
    { stdio: 'inherit' }
  );
}

const still = await download(SOURCES.still, join(work, 'src-still.mp4'));
const scrub = await download(SOURCES.scrub, join(work, 'src-scrub.mp4'));

// Only ever displays frame 0, so a normal GOP is fine.
encode(still, 'public/hero-still.mp4', []);
// Scroll-scrubbed: every frame must be a keyframe.
encode(scrub, 'public/hero-scrub.mp4', [
  '-g', '1',
  '-keyint_min', '1',
  '-sc_threshold', '0',
]);

console.log('done');
