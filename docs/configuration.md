# 配置指南

## 统一配置 `src/config.ts`

所有站点配置集中在 `src/config.ts` 文件中，修改此文件即可控制博客的各个方面。

### 站点基础配置

```typescript
export const siteConfig = {
  title: 'TerseBlog',              // 博客标题
  description: 'A minimalist...',  // 站点描述
  site: 'https://example.com',    // 网站 URL（用于 Sitemap/RSS）
  language: 'en',                  // 默认页面语言（i18n 关闭时生效）
};
```

### 多语言配置 (i18n)

```typescript
i18n: {
  enabled: true,                   // 开启/关闭多语言
  defaultLocale: 'zh-CN',          // 默认语种（缺译时回退到此）
  locales: ['en', 'zh-CN', 'zh-TW', 'ja'], // 支持的语言列表
  prefixMap: {                     // URL 路径前缀映射
    'en': 'en',
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW',
    'ja': 'ja',
  },
},
```

便捷开关：

```bash
npm run i18n          # 查看当前状态
npm run i18n:on       # 开启
npm run i18n:off      # 关闭
```

**i18n 开启时**：每种语言用独立的 URL 前缀（如 `/zh-CN/posts/hello-world`），RSS 每语种独立，搜索索引按语种分割。UI 文案通过 `src/i18n/dictionaries/` 下的 JSON 文件管理。

**i18n 关闭时**：退化为单语言模式，URL 无前缀，所有页面与原项目一致。

**添加新语种**：
1. 在 `locales` 和 `prefixMap` 中加入新语言
2. 创建 `src/i18n/dictionaries/<locale>.json`（复制 en.json 翻译）
3. 创建 `src/posts/<locale>/` 目录放译文

### 主题与样式

本博客使用黑白色调极简主题。所有颜色值直接使用 `#000` / `#fff` / `#ddd` / `#888` 等，配合 `[data-theme='dark']` 选择器实现暗色模式。

样式文件位于：
- `src/styles/global.css` — 全局样式（重置、排版、按钮、标签等）
- `src/styles/interactivity.css` — TOC 可见性控制、View Transitions

修改 `global.css` 中的颜色值即可自定义主题。无需 CSS 变量。

### 导航菜单

```typescript
nav: [
  { text: 'Posts', link: '/' },
  { text: 'Tags', link: '/tags' },
  { text: 'Archive', link: '/archive' },
  { text: 'About', link: '/about' },
],
```

支持内部链接和外部链接（外部链接会自动添加 `target="_blank"`）。导航文案当前保持硬编码，不随语言切换（后续版本会接入 i18n 字典）。

### 作者信息

```typescript
author: {
  name: 'Your Name',
  email: 'hello@example.com',
  avatar: '/avatar.jpg',
  bio: 'A passionate developer',
  social: {
    github: 'https://github.com/yourname',
    twitter: 'https://twitter.com/yourname',
  },
},
```

头像图片放在 `public/` 目录中。

### Umami 统计分析

```typescript
analytics: {
  umami: {
    enabled: false,                      // 设为 true 启用
    src: 'https://umami.example.com/script.js',
    websiteId: 'your-website-id',
  },
},
```

Umami 是一个开源的网站统计工具，支持自托管。

### 内容设置

```typescript
content: {
  postsPerPage: 5,        // 每页文章数
  tocMaxDepth: 3,         // TOC 最大标题深度（1-6）
  readingSpeed: {
    cn: 300,              // 中文阅读速度（字/分钟）
    en: 160,              // 英文阅读速度（词/分钟）
  },
  excerptLength: 200,     // 摘要最大字符数
},
```

### RSS 设置

```typescript
rss: {
  enabled: true,
  filename: 'rss.xml',
},
```

i18n 开启时每种语言生成独立的 RSS（路径为 `/<locale>/rss.xml`）。

## 添加博客文章

文章按语言分目录存放：

```
src/posts/
├── en/           # 英文
├── zh-CN/        # 简体中文（默认语种）
├── zh-TW/        # 繁體中文
└── ja/           # 日本語
```

在对应目录下创建 `.md` 文件，格式如下：

```markdown
---
title: 文章标题
date: 2025-01-01
description: 文章描述/摘要
tags: [标签1, 标签2]
draft: false
updated: 2025-06-01
---

# 文章内容

文章正文使用 Markdown 编写...
```

### Frontmatter 字段

| 字段 | 必需 | 说明 |
|------|------|------|
| `title` | ✅ | 文章标题 |
| `date` | ✅ | 发布日期（ISO 8601 格式） |
| `description` | ❌ | 文章摘要/描述 |
| `tags` | ❌ | 标签数组 |
| `draft` | ❌ | 草稿状态（生产环境不显示） |
| `updated` | ❌ | 更新日期 |

### 多语言文章

- 同名文章放在不同语种子目录下（如 `zh-CN/hello.md` ↔ `en/hello.md`）
- 每篇有独立的 frontmatter（`title`/`description`/`tags` 各自翻译）
- 如果某个语种缺少某篇文章，**自动回退**到默认语种（`defaultLocale`）的内容
- 例如：`/en/posts/foo` 不存在 → 显示 `zh-CN/posts/foo` 的内容（但 UI 仍为英文）

## LaTeX 数学公式

### 行内公式

使用单个美元符号：`$E = mc^2$` → $E = mc^2$

### 展示公式

使用双美元符号：

```latex
$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$
```

### 常用公式示例

```latex
$$  // 分式
\frac{a}{b}
$$

$$  // 求和
\sum_{k=1}^{n} k
$$

$$  // 矩阵
\begin{pmatrix}
a & b \
c & d
\end{pmatrix}
$$

$$  // 方程组
\begin{cases}
x + y = 1 \
x - y = 2
\end{cases}
$$

$$  // 积分
\int_{a}^{b} f(x)\,dx
$$
```

## 自定义域名与 SEO

1. 修改 `src/config.ts` 中的 `site` 字段为你的域名
2. 在 `astro.config.ts` 中更新 `site` 配置
3. 在 Cloudflare Pages 或 GitHub Pages 的设置中绑定自定义域名
4. Sitemap 会基于配置的 `site` 自动生成

## 常见问题

### npm 安装失败

使用淘宝镜像：

```bash
npm config set registry https://registry.npmmirror.com
```

### 构建内存不足

```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### 如何添加 PWA 支持

可集成 `@astrojs/pwa` 插件或使用 `vite-plugin-pwa`。

### 如何添加评论系统

推荐集成 Giscus（基于 GitHub Discussions）或 Waline（支持自部署）。

### i18n 构建产物会不会很多

i18n 开启时每个语种生成完整的一套页面（文章数 × 4 × 各类页面）。如果只有 10 篇文章，约生成 100 个页面。只需确保部署平台支持（GitHub Pages / Cloudflare Pages 均无压力）。
