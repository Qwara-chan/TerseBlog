import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeExternalLinks } from './src/lib/rehype-external-links';
import { siteConfig } from './src/config';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
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
        internalDomain: new URL(siteConfig.site).hostname,
        addIcon: true,
      }],
    ],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
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
