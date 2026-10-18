/**
 * 站点全局配置：改这里就能改全站标题、简介、导航。
 */
export const SITE = {
  /** 站名，显示在浏览器标签和页头 */
  title: 'MONO',
  /** 一句话简介，用于首页和 SEO 描述 */
  description: '工程实践、源码阅读与生活杂记。用最少的装饰，放最多的内容。',
  /** 站点上线地址（也是 RSS 的兜底地址） */
  url: 'https://leezhopes.github.io',
  nav: [
    { href: '/', label: '首页' },
    { href: '/blog/', label: '文章' },
    { href: '/tags/', label: '标签' },
    { href: '/about/', label: '关于' },
  ],
} as const;

/** 每页 / 每处列表展示的难度：留空则显示全部 */
export const HOME_POST_LIMIT = 10;
