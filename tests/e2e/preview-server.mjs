import process from 'node:process';

import preview from '../../node_modules/astro/dist/core/preview/index.js';

const server = await preview({
  root: process.cwd(),
  logLevel: 'silent',
  server: {
    host: '127.0.0.1',
    port: 4321,
  },
});

let stopping = false;
const parentPid = process.ppid;
let parentWatch;

const stop = async () => {
  if (stopping) return;
  stopping = true;
  clearInterval(parentWatch);
  await server.stop();
  process.exit(0);
};

process.once('SIGINT', stop);
process.once('SIGTERM', stop);

parentWatch = setInterval(() => {
  try {
    process.kill(parentPid, 0);
  } catch {
    void stop();
  }
}, 1000);
parentWatch.unref();
