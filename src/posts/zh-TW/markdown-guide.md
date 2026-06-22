---
title: Markdown 指南
date: 2026-06-07
description: 本部落格所支援 Markdown 功能的完整指南，包含程式碼區塊、表格、LaTeX 等等。
tags: [markdown, 指南, 教學]
draft: false
updated: 2026-06-07
---

# Markdown 指南

這篇文章展示了本部落格所支援的所有 Markdown 功能。

## 文字格式

**粗體文字**、*斜體文字*、~~刪除線~~，以及 `行內程式碼`。

## 引用

> 這是一段引用。
>
> 引用可以跨越多個段落。

## 列表

### 無序列表

- 項目一
- 項目二
  - 巢狀項目
  - 另一個巢狀項目
- 項目三

### 有序列表

1. 第一步
2. 第二步
3. 第三步

## 程式碼區塊

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

| 功能 | 支援 | 備註 |
|---------|---------|-------|
| Markdown | ✅ | 完整 GFM |
| LaTeX 數學 | ✅ | KaTeX 渲染 |
| 程式碼高亮 | ✅ | Shiki |
| RSS | ✅ | 自動產生 |
| 搜尋 | ✅ | Fuse.js |
| 深色模式 | ✅ | 系統偏好 |

## 連結

[Astro 官方文件](https://docs.astro.build)

外部連結：[GitHub](https://github.com)

## 圖片

![Placeholder](https://placehold.co/800x400/3b82f6/ffffff?text=Blog+Image)

## LaTeX 數學

### 行內數學

愛因斯坦的方程式：$E = mc^2$

一元二次方程式公式：$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

### 展示數學

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

## 註解

這是一個帶有註解的句子[^1]。

[^1]: 這是註解的內容。

## 分隔線

---

## 任務列表

- [x] 建立 Astro 部落格
- [x] 加入 Markdown 支援
- [x] 實作搜尋功能
- [ ] 加上留言系統
- [ ] 部署到正式環境

## HTML

部分行內 <span style="color: #000;">樣式化 HTML</span> 也能正常運作。

<details>
<summary>點擊展開</summary>
隱藏的內容已揭露！
</details>
