---
title: Markdown 指南
date: 2026-06-07
description: 本博客所支持 Markdown 功能的完整指南，包括代码块、表格、LaTeX 等等。
tags: [markdown, 指南, 教程]
draft: false
updated: 2026-06-07
---

# Markdown 指南

本文演示了本博客所支持的所有 Markdown 功能。

## 文本格式

**粗体文本**、*斜体文本*、~~删除线~~，以及 `行内代码`。

## 引用

> 这是一段引用。
>
> 引用可以跨越多个段落。

## 列表

### 无序列表

- 项目一
- 项目二
  - 嵌套项目
  - 另一个嵌套项目
- 项目三

### 有序列表

1. 第一步
2. 第二步
3. 第三步

## 代码块

### JavaScript

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('Astro');
```

### Python

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print(list(fibonacci(10)))
```

### Bash

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 表格

| 功能 | 支持 | 备注 |
|---------|---------|-------|
| Markdown | ✅ | 完整 GFM |
| LaTeX 数学 | ✅ | KaTeX 渲染 |
| 代码高亮 | ✅ | Shiki |
| RSS | ✅ | 自动生成 |
| 搜索 | ✅ | Fuse.js |
| 深色模式 | ✅ | 系统偏好 |

## 链接

[Astro 官方文档](https://docs.astro.build)

外部链接：[GitHub](https://github.com)

## 图片

![Placeholder](https://placehold.co/800x400/3b82f6/ffffff?text=Blog+Image)

## LaTeX 数学

### 行内数学

爱因斯坦的方程式：$E = mc^2$

一元二次方程求根公式：$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

### 展示数学

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

$$
\nabla \times \vec{E} = -\frac{\partial \vec{B}}{\partial t}
$$

$$
f(x) = \begin{cases}
x^2 & \text{若 } x \geq 0 \\
-x^2 & \text{若 } x < 0
\end{cases}
$$

## 脚注

这是一个带有脚注的句子[^1]。

[^1]: 这是脚注的内容。

## 分隔线

---

## 任务列表

- [x] 创建 Astro 博客
- [x] 添加 Markdown 支持
- [x] 实现搜索功能
- [ ] 添加评论系统
- [ ] 部署到生产环境

## HTML

部分行内 <span style="color: #000;">样式化 HTML</span> 也能正常工作。

<details>
<summary>点击展开</summary>
隐藏的内容已展示！
</details>
