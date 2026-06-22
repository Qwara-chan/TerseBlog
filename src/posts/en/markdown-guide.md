---
title: Markdown Guide
date: 2026-06-07
description: A comprehensive guide to Markdown features supported on this blog, including code blocks, tables, LaTeX, and more.
tags: [markdown, guide, tutorial]
draft: false
updated: 2026-06-07
---

# Markdown Guide

This post demonstrates all the Markdown features supported on this blog.

## Text Formatting

**Bold text**, *italic text*, ~~strikethrough~~, and `inline code`.

## Blockquotes

> This is a blockquote.
>
> It can span multiple paragraphs.

## Lists

### Unordered List

- Item one
- Item two
  - Nested item
  - Another nested item
- Item three

### Ordered List

1. First step
2. Second step
3. Third step

## Code Blocks

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

## Tables

| Feature | Support | Notes |
|---------|---------|-------|
| Markdown | ✅ | Full GFM |
| LaTeX Math | ✅ | KaTeX rendering |
| Code Highlight | ✅ | Shiki |
| RSS | ✅ | Auto-generated |
| Search | ✅ | Fuse.js |
| Dark Mode | ✅ | System preference |

## Links

[Astro Documentation](https://docs.astro.build)

External link: [GitHub](https://github.com)

## Images

![Placeholder](https://placehold.co/800x400/3b82f6/ffffff?text=Blog+Image)

## LaTeX Math

### Inline Math

Einstein's equation: $E = mc^2$

The quadratic formula: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

### Display Math

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

$$
\nabla \times \vec{E} = -\frac{\partial \vec{B}}{\partial t}
$$

$$
f(x) = \begin{cases}
x^2 & \text{if } x \geq 0 \\
-x^2 & \text{if } x < 0
\end{cases}
$$

## Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

## Horizontal Rule

---

## Task List

- [x] Create Astro blog
- [x] Add Markdown support
- [x] Implement search functionality
- [ ] Add comments system
- [ ] Deploy to production

## HTML

Some inline <span style="color: #000;">styled HTML</span> works too.

<details>
<summary>Click to expand</summary>
Hidden content revealed!
</details>
