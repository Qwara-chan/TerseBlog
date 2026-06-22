---
title: LaTeX 数式デモ
date: 2026-06-07
description: この Astro ブログにおける、KaTeX による LaTeX 数式レンダリングのショーケースです。
tags: [数学, latex, katex]
draft: false
---

# LaTeX 数式デモ

この記事では、KaTeX でレンダリングされるさまざまな LaTeX 数式をデモします。

## 微分積分

### 導関数

$$
\frac{d}{dx} \left( \int_{a}^{x} f(t)\,dt \right) = f(x)
$$

積の公式：

$$
(fg)' = f'g + fg'
$$

### 積分

二重積分：

$$
\iint_{D} f(x,y)\,dx\,dy
$$

線積分：

$$
\oint_{C} \vec{F} \cdot d\vec{r}
$$

## 線形代数

行列：

$$
A = \begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{pmatrix}
$$

行列式：

$$
\det(A) = \sum_{\sigma \in S_n} \operatorname{sgn}(\sigma) \prod_{i=1}^{n} a_{i,\sigma(i)}
$$

## 物理

マクスウェル方程式：

$$
\begin{aligned}
\nabla \cdot \vec{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \vec{B} &= 0 \\
\nabla \times \vec{E} &= -\frac{\partial \vec{B}}{\partial t} \\
\nabla \times \vec{B} &= \mu_0\vec{J} + \mu_0\varepsilon_0\frac{\partial \vec{E}}{\partial t}
\end{aligned}
$$

シュレーディンガー方程式：

$$
i\hbar\frac{\partial}{\partial t}|\Psi\rangle = \hat{H}|\Psi\rangle
$$

## 統計学

正規分布：

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}
$$

ベイズの定理：

$$
P(A|B) = \frac{P(B|A)\,P(A)}{P(B)}
$$

## ギリシャ文字

$$
\alpha, \beta, \gamma, \delta, \epsilon, \zeta, \eta, \theta, \iota, \kappa, \lambda, \mu, \nu, \xi, \omicron, \pi, \rho, \sigma, \tau, \upsilon, \phi, \chi, \psi, \omega
$$

$$
\Gamma, \Delta, \Theta, \Lambda, \Xi, \Pi, \Sigma, \Phi, \Psi, \Omega
$$
