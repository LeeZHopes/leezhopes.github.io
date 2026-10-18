import type { CollectionEntry } from 'astro:content';

/** 2026-10-18 这种稳定格式，等宽字体下更整齐 */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** 中文按字算、英文按词算，300 字/分钟 */
export function readingTime(body: string | undefined): number {
  if (!body) return 1;
  const text = body.replace(/```[\s\S]*?```/g, ' ');
  const cjk = text.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const words = text.match(/[a-zA-Z0-9]+/g)?.length ?? 0;
  return Math.max(1, Math.round((cjk + words * 1.3) / 300));
}

/** 按发布时间倒序，草稿排除在外 */
export function sortByDateDesc(posts: CollectionEntry<'blog'>[]) {
  return [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** 按年份分组，用于归档视图 */
export function groupByYear(posts: CollectionEntry<'blog'>[]) {
  const map = new Map<number, CollectionEntry<'blog'>[]>();
  for (const post of posts) {
    const year = post.data.pubDate.getFullYear();
    const list = map.get(year) ?? [];
    list.push(post);
    map.set(year, list);
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}
