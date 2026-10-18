/**
 * lockfile 健康检查：防止"空壳条目"把 CI 干死
 *
 * 背景：在 Windows 上生成 package-lock.json 时，npm 有时会为"当前平台用不到的可选依赖"
 * 写下只有 { "optional": true }、没有 version 的占位条目。本地 npm install 能容忍，
 * 但 CI（Linux）跑 `npm ci` 时会直接报 `npm error Invalid Version:` —— 冒号后面是空的，
 * 因为版本号是 undefined，排查起来非常费时。
 *
 * 用法：
 *   node scripts/check-lockfile.mjs          # 提交前自检
 *   CI 里在 npm ci 之前跑同一条命令（fail fast）
 */
import { readFileSync } from 'node:fs';

const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
const entries = Object.entries(lock.packages ?? {});

const bad = entries.filter(([path, meta]) => path !== '' && !meta.version);

if (bad.length > 0) {
  console.error('lockfile 里有缺少 version 的空壳条目（会让 npm ci 报 Invalid Version）：');
  for (const [path] of bad) console.error('  - ' + path);
  console.error('\n修复：删除 package-lock.json 后重新生成，再跑一次本检查');
  console.error('  rm package-lock.json && npm install --package-lock-only');
  process.exit(1);
}

console.log(`lockfile OK: ${entries.length - 1} 个包，lockfileVersion ${lock.lockfileVersion}`);
