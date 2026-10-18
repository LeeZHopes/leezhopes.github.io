import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 文章集合：src/content/blog/ 下的每个 .md 文件就是一篇，文件名即 URL 路径。
 * 例如 hello-world.md → /blog/hello-world/
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    /** 文章标题 */
    title: z.string(),
    /** 摘要，用于列表与 SEO 描述 */
    description: z.string().default(''),
    /** 发布日期，写成 2026-10-18 这种形式即可 */
    pubDate: z.coerce.date(),
    /** 最后更新日期，可选 */
    updatedDate: z.coerce.date().optional(),
    /** 标签，用于 /tags/ 归档 */
    tags: z.array(z.string()).default([]),
    /** 草稿：true 时不会出现在任何列表和构建结果里 */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
