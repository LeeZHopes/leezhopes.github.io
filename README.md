# MONO · 个人博客

一个用 Astro 手写的极简技术风博客：Markdown 写文章，构建成纯静态 HTML，默认零 JavaScript（只有深浅色切换用到一点脚本）。

## 快速开始

```bash
npm install
npm run dev      # http://localhost:4321
```

其他命令：

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 本地开发，热更新 |
| `npm run build` | 构建到 `dist/` |
| `npm run preview` | 预览构建产物 |
| `npm run check` | 类型检查（astro check，当前 0 error） |

要求 Node 18 以上（本项目在 Node 24 下验证）。

## 目录结构

```
blog/
├── astro.config.mjs        # 站点配置（域名在这里改）
├── public/
│   └── favicon.svg
└── src/
    ├── consts.ts           # 站名、简介、导航 —— 先改这里
    ├── content.config.ts   # 文章集合的 frontmatter 校验
    ├── content/blog/       # ★ 文章都放这里，一个 .md 一篇
    ├── components/         # Header / Footer / PostList
    ├── layouts/
    │   └── BaseLayout.astro
    ├── lib/blog.ts         # 日期、阅读时长、排序等工具
    ├── pages/
    │   ├── index.astro     # 首页（最新文章）
    │   ├── blog/           # /blog/ 归档 + /blog/[slug]/ 文章页
    │   ├── tags/           # /tags/ 与 /tags/[tag]/
    │   ├── about.astro
    │   ├── 404.astro
    │   └── rss.xml.ts      # /rss.xml
    └── styles/global.css   # 全部样式（手写，无框架）
```

## 写一篇文章

在 `src/content/blog/` 新建 `my-first-post.md`，文件名就是 URL：`/blog/my-first-post/`。

```markdown
---
title: 文章标题
description: 一句话摘要，会出现在列表和搜索结果里
pubDate: 2026-10-18
updatedDate: 2026-10-20      # 可选
tags: ['工程', '笔记']        # 可选，自动生成 /tags/ 归档
draft: false                 # true 时不会出现在任何地方
---

正文从这里开始。
```

frontmatter 由 `src/content.config.ts` 校验，写错字段（比如日期写成 `2026/10/18` 以外的乱码）会在构建时直接报错，不会静默渲染成 `Invalid Date`。

## 改成你自己的

1. **站名与简介**：`src/consts.ts` 里的 `SITE.title`、`SITE.description`、`SITE.nav`。
2. **域名**：`astro.config.mjs` 的 `site`，RSS、canonical、OG 都读它。
3. **页脚链接**：`src/components/Footer.astro` 里的 GitHub 地址。
4. **配色与字号**：`src/styles/global.css` 顶部的 CSS 变量（`--bg`、`--accent`、`--measure` 等）。
5. **示例文章**：`src/content/blog/` 下两篇可以直接删掉或改成自己的。

## 已包含的功能

- 深浅色主题：默认跟随系统，页头按钮可手动切换并记住选择（首屏前内联脚本写入，不会闪白）
- 标签归档、年份归档、文章目录（h2 自动生成）、上一篇 / 下一篇
- RSS：`/rss.xml`，构建产物里是静态文件
- SEO：`<title>`、description、canonical、Open Graph
- 草稿支持：`draft: true` 不进构建
- 响应式：正文 45rem 单栏，窄屏自动折叠日期列

## 部署

构建产物是 `dist/`，纯静态文件，扔哪儿都能跑。

**GitHub Pages / Cloudflare Pages / Vercel** 通用的做法：

1. 把 `astro.config.mjs` 的 `site` 改成你的真实域名。
2. 推到 Git 仓库，平台里选 Astro 预设，构建命令 `npm run build`，输出目录 `dist`。
3. 如果部署在子路径（如 `https://user.github.io/blog/`），还要在 `astro.config.mjs` 里加 `base: '/blog/'`。

**手搓服务器**：`npm run build` 后把 `dist/` 里的内容拷到 Nginx / 对象存储即可。注意中文标签路径会以百分号编码出现在 URL 里，主流静态服务器都能正确解析。

## 环境说明

项目锁定 **Astro 6.4**。本机实测 Astro 7.4（Vite 8）在加载只提供 CJS 入口的 `yaml` 依赖时会报 `require is not defined`，导致 `astro sync` 失败；等上游修复后再考虑升级（`npx @astrojs/upgrade`）。
