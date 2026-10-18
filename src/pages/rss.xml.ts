import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';
import { sortByDateDesc } from '../lib/blog';

export async function GET(context: APIContext) {
  const posts = sortByDateDesc(await getCollection('blog', ({ data }) => !data.draft));

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: '<language>zh-cn</language>',
  });
}
