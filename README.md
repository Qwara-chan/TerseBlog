# TerseBlog

A modern static blog built with [Astro](https://astro.build). Markdown content, LaTeX math, full-text search, dark mode, RSS, and a settings panel for personalized reading.

🔗 **Live Demo**: [blog.qwara.top](https://blog.qwara.top)

---

[中文版本](#中文)

## Features

- 📝 **Markdown** — Write posts in Markdown with Frontmatter
- 📐 **LaTeX Math** — KaTeX integration for inline and display math
- 🔍 **Full-text Search** — Build-time search index, client-side Fuse.js instant search
- 🌓 **Dark Mode** — Light / Dark / System three modes
- ⚙️ **Settings Panel** — Font size, content width, font family, TOC visibility
- 📑 **Table of Contents** — Sidebar TOC with scroll-spy highlighting
- ⏱ **Reading Time** — Auto-estimate for mixed CJK + English content
- 🏷 **Tag System** — Tag categorization and tag cloud
- 📡 **RSS Feed** — Auto-generated RSS
- 🗺 **Sitemap** — Auto-generated sitemap
- 📱 **Responsive** — Desktop and mobile friendly
- 🔄 **View Transitions** — Built-in page transition animations

## Quick Start

```bash
# 1. Clone
git clone https://github.com/Qwara-chan/TerseBlog.git
cd TerseBlog

# 2. Install
npm install

# 3. Dev server
npm run dev

# 4. Build
npm run build

# 5. Preview build
npm run preview
```

## Project Structure

```
TerseBlog/
├── astro.config.ts
├── tsconfig.json
├── package.json
├── src/
│   ├── config.ts              # Site configuration
│   ├── layouts/
│   │   └── BaseLayout.astro   # Base layout
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PostCard.astro
│   │   ├── Pagination.astro
│   │   ├── TOC.astro
│   │   ├── Search.astro
│   │   ├── SettingsPanel.astro
│   │   ├── BackToTop.astro
│   │   ├── MobileMenu.astro
│   │   ├── SortToggle.astro
│   │   ├── DiffViewer.astro
│   │   └── ExternalLink.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── posts/[...slug].astro
│   │   ├── tags/index.astro
│   │   ├── tags/[tag].astro
│   │   ├── archive.astro
│   │   ├── about.astro
│   │   ├── 404.astro
│   │   ├── search-index.json.ts
│   │   └── rss.xml.ts
│   ├── lib/
│   │   ├── content.ts
│   │   ├── utils.ts
│   │   ├── search.ts
│   │   └── types.ts
│   ├── styles/
│   │   ├── global.css
│   │   └── interactivity.css
│   └── posts/                 # Blog posts (Markdown)
└── public/                    # Static assets
```

## Deployment

### Cloudflare Pages

1. Go to **Pages** in [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Create a project** → **Connect to Git**
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. **Save and Deploy**

### GitHub Pages

1. Go to **Settings** → **Pages** in your repo
2. Select **GitHub Actions** as the Source
3. Push to `main` — GitHub Actions builds and deploys automatically

A pre-configured workflow is available at `.github/workflows/deploy.yml`.

## Tech Stack

| Technology | Purpose |
|---|---|
| [Astro 5](https://astro.build) | Static site generator |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [KaTeX](https://katex.org) | LaTeX math rendering |
| [Fuse.js](https://fusejs.io) | Fuzzy search |
| [rehype-katex](https://github.com/remarkjs/remark-math) | Markdown math |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap) | Sitemap |
| [@astrojs/rss](https://docs.astro.build/en/guides/rss) | RSS feed |

## License

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)

---

<h2 id="中文">中文</h2>

## TerseBlog

基于 [Astro](https://astro.build) 构建的现代化静态博客，支持 Markdown、LaTeX 数学公式、全文搜索、暗色模式、RSS 订阅，内置设置面板可个性化调整字体大小、内容宽度等。

🔗 **示例站点**: [blog.qwara.top](https://blog.qwara.top)

### 功能特性

- 📝 **Markdown** — Markdown 编写文章，支持 Frontmatter
- 📐 **LaTeX 数学公式** — KaTeX 集成，行内和展示公式
- 🔍 **全文搜索** — 构建时生成索引，Fuse.js 客户端即时搜索
- 🌓 **暗色模式** — 亮色/暗色/跟随系统三种模式
- ⚙️ **设置面板** — 字体大小、内容宽度、字体切换、TOC 显隐
- 📑 **目录导航** — 侧边目录，滚动高亮
- ⏱ **阅读时长** — 中英文混合内容自动估算
- 🏷 **标签系统** — 文章标签分类与标签云
- 📡 **RSS 订阅** — 自动生成 RSS Feed
- 📱 **响应式设计** — 适配桌面和移动端
- 🔄 **页面过渡动画** — 内置 View Transitions API

### 快速开始

```bash
# 中国大陆用户可先配置 npm 镜像
npm config set registry https://registry.npmmirror.com

# 1. 克隆
git clone https://github.com/Qwara-chan/TerseBlog.git
cd TerseBlog

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 构建
npm run build

# 5. 预览构建结果
npm run preview
```

### 部署

详见上方 [Deployment](#deployment) 章节。

### 技术栈

| 技术 | 用途 |
|------|------|
| [Astro 5](https://astro.build) | 静态站点生成器 |
| [TypeScript](https://www.typescriptlang.org) | 类型安全 |
| [KaTeX](https://katex.org) | LaTeX 数学公式渲染 |
| [Fuse.js](https://fusejs.io) | 模糊搜索 |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap) | 站点地图 |
| [@astrojs/rss](https://docs.astro.build/en/guides/rss) | RSS 订阅 |

### 许可证

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
