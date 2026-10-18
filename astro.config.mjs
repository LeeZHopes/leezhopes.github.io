// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // 用户主页形态（仓库名 = leezhopes.github.io），站点在根路径，无需 base
  // RSS / canonical / OG / sitemap 都会引用这个值
  site: 'https://leezhopes.github.io',
});
