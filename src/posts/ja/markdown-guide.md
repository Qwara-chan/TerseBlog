---
title: Markdown ガイド
date: 2026-06-07
description: このブログでサポートされている Markdown 機能の包括的なガイドです。コードブロック、表、LaTeX などについて解説します。
tags: [markdown, ガイド, チュートリアル]
draft: false
updated: 2026-06-07
---

# Markdown ガイド

この記事では、このブログでサポートされているすべての Markdown 機能を紹介します。

## テキストの書式

**太文字**、*斜体*、~~取り消し線~~、そして `インラインコード`。

## 引用

> これは引用です。
>
> 引用は複数の段落にまたがることもできます。

## リスト

### 順序なしリスト

- 項目 1
- 項目 2
  - ネストされた項目
  - 別のネスト項目
- 項目 3

### 順序付きリスト

1. 最初の手順
2. 次の手順
3. 最後の手順

## コードブロック

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

## 表

| 機能 | サポート | 備考 |
|---------|---------|-------|
| Markdown | ✅ | 完全な GFM |
| LaTeX 数式 | ✅ | KaTeX レンダリング |
| コードハイライト | ✅ | Shiki |
| RSS | ✅ | 自動生成 |
| 検索 | ✅ | Fuse.js |
| ダークモード | ✅ | システム設定に従う |

## リンク

[Astro ドキュメント](https://docs.astro.build)

外部リンク：[GitHub](https://github.com)

## 画像

![Placeholder](https://placehold.co/800x400/3b82f6/ffffff?text=Blog+Image)

## LaTeX 数式

### インライン数式

アインシュタインの式：$E = mc^2$

二次方程式の解の公式：$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

### ディスプレイ数式

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

## 脚注

脚注付きの文章の例です[^1]。

[^1]: これが脚注の内容です。

## 区切り線

---

## タスクリスト

- [x] Astro ブログを作成
- [x] Markdown サポートを追加
- [x] 検索機能を実装
- [ ] コメントシステムを追加
- [ ] 本番環境へデプロイ

## HTML

一部のインライン <span style="color: #000;">スタイル付き HTML</span> も動作します。

<details>
<summary>クリックして展開</summary>
隠されたコンテンツが表示されました！
</details>
