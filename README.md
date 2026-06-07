# Astro 静态博客

基于 [Astro](https://astro.build) 构建的现代化静态博客系统，支持 Markdown 内容、LaTeX 数学公式、全文搜索、暗色模式、RSS 订阅等功能。

## 功能特性

- 📝 **Markdown 内容** — 使用 Markdown 编写博客文章，支持 Frontmatter
- 📐 **LaTeX 数学公式** — 集成 KaTeX，支持行内和展示数学公式
- 🔍 **全文搜索** — 构建时生成搜索索引，客户端 Fuse.js 即时搜索
- 🌓 **暗色模式** — 支持亮色/暗色/跟随系统三种模式
- 📑 **目录导航** — 文章侧边目录（TOC），支持滚动高亮
- ⏱ **阅读时长** — 自动计算中英文混合内容的阅读时间
- 🏷 **标签系统** — 文章标签分类与标签云
- 📡 **RSS 订阅** — 自动生成 RSS Feed
- 🗺 **站点地图** — 自动生成 Sitemap
- 📱 **响应式设计** — 适配桌面和移动设备
- 🎨 **CSS 变量主题** — 轻松自定义颜色和样式
- 🔄 **页面过渡动画** — 内置 View Transitions API
- ⚙️ **设置面板** — 字体大小、TOC 显示等个性化设置

## 快速开始

### 中国大陆用户请注意

由于网络环境，建议配置 npm 镜像：

```bash
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com
```

### 安装与运行

```bash
# 1. 克隆项目
git clone <your-repo-url>
cd astro-blog

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 构建静态文件
npm run build

# 5. 预览构建结果
npm run preview
```

## 项目结构

```
astro-blog/
├── astro.config.ts          # Astro 配置
├── tsconfig.json            # TypeScript 配置
├── package.json             # 依赖管理
├── .gitignore               # Git 忽略规则
├── README.md                # 项目说明
├── docs/
│   └── configuration.md     # 配置指南
├── .github/workflows/
│   └── deploy.yml           # GitHub Actions 部署
├── public/                  # 静态资源
├── src/
│   ├── config.ts            # 统一配置
│   ├── layouts/             # 页面布局
│   │   └── BaseLayout.astro
│   ├── components/          # UI 组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PostCard.astro
│   │   ├── Pagination.astro
│   │   ├── TOC.astro
│   │   ├── Search.astro
│   │   ├── ThemeToggle.astro
│   │   ├── SettingsPanel.astro
│   │   ├── BackToTop.astro
│   │   ├── MobileMenu.astro
│   │   ├── SortToggle.astro
│   │   ├── DiffViewer.astro
│   │   └── ExternalLink.astro
│   ├── pages/               # 页面路由
│   │   ├── index.astro
│   │   ├── posts/[...slug].astro
│   │   ├── tags/index.astro
│   │   ├── tags/[tag].astro
│   │   ├── archive.astro
│   │   ├── about.astro
│   │   ├── 404.astro
│   │   ├── search-index.json.ts
│   │   └── rss.xml.ts
│   ├── lib/                 # 工具库
│   │   ├── content.ts
│   │   ├── utils.ts
│   │   ├── search.ts
│   │   ├── theme.ts
│   │   ├── transitions.ts
│   │   └── rehype-*.ts
│   ├── styles/              # 样式
│   │   ├── global.css
│   │   └── interactivity.css
│   └── content/posts/       # 博客文章
│       ├── hello-world.md
│       └── markdown-guide.md
```

## 部署

### Cloudflare Pages

1. 在 [Cloudflare Dashboard](https://dash.cloudflare.com) 中进入 **Pages**
2. 点击 **Create a project** → **Connect to Git**
3. 选择你的仓库，配置构建设置：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. 点击 **Save and Deploy**

> 注意：中国大陆访问 Cloudflare 可能需要调整 DNS 设置。

### GitHub Pages

1. 在 GitHub 仓库中进入 **Settings** → **Pages**
2. 选择 **GitHub Actions** 作为 Source
3. 推送代码到 `main` 分支，GitHub Actions 会自动构建并部署

也可以使用 `.github/workflows/deploy.yml` 中预配置的 workflow。

## 技术栈

| 技术 | 用途 |
|------|------|
| [Astro 5](https://astro.build) | 静态站点生成器 |
| [TypeScript](https://www.typescriptlang.org) | 类型安全 |
| [KaTeX](https://katex.org) | LaTeX 数学公式渲染 |
| [Fuse.js](https://fusejs.io) | 模糊搜索 |
| [rehype-katex](https://github.com/remarkjs/remark-math) | Markdown 数学公式 |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap) | 站点地图 |
| [@astrojs/rss](https://docs.astro.build/en/guides/rss) | RSS 订阅 |

## 许可证

本项目采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可证。
