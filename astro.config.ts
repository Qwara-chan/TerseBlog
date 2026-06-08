import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeExternalLinks } from './src/lib/rehype-external-links';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.qwara.top',
  base: '/',
  trailingSlash: 'never',
  output: 'static',
  compressHTML: true,
  build: {
    format: 'file',
  },
  markdown: {
    remarkPlugins: [
      remarkMath,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'append',
        properties: {
          class: 'heading-anchor',
          ariaHidden: 'true',
          tabIndex: -1,
        },
        content: {
          type: 'text',
          value: '#',
        },
      }],
      [rehypeExternalLinks, {
        internalDomain: 'example.com',
        addIcon: true,
      }],
    ],
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
  integrations: [
    mdx(),
    sitemap(),
  ],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
