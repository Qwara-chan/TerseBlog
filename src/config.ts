export const siteConfig = {
  title: 'TerseBlog',
  description: 'A minimalist blog in black & white',
  site: 'https://example.com',
  language: 'zh-CN',

  author: {
    name: 'Your Name',
    email: 'hello@example.com',
    avatar: '/avatar.jpg',
    bio: 'Writer & developer',
    social: {
      github: 'https://github.com/yourname',
      twitter: 'https://twitter.com/yourname',
    },
  },

  nav: [
    { text: 'Posts', link: '/' },
    { text: 'Tags', link: '/tags' },
    { text: 'Archive', link: '/archive' },
    { text: 'About', link: '/about' },
  ],

  license: {
    type: 'CC BY-NC-SA 4.0',
    url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },

  analytics: {
    umami: { enabled: false, src: '', websiteId: '' },
  },

  content: {
    postsPerPage: 5,
    tocMaxDepth: 3,
    readingSpeed: { cn: 300, en: 160 },
    excerptLength: 200,
  },

  rss: {
    enabled: true,
    filename: 'rss.xml',
  },
} as const;

export type SiteConfig = typeof siteConfig;
