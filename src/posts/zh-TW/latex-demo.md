---
title: LaTeX 數學示範
date: 2026-06-07
description: 展示本 Astro 部落格使用 KaTeX 渲染 LaTeX 數學方程式的效果。
tags: [數學, latex, katex]
draft: false
---

# LaTeX 數學示範

這篇文章展示了使用 KaTeX 渲染的各種 LaTeX 數學方程式。

## 微積分

### 導數

$$
\frac{d}{dx} \left( \int_{a}^{x} f(t)\,dt \right) = f(x)
$$

乘積法則：

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

## 線性代數

矩陣：

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

馬克士威方程式：

$$
\begin{aligned}
\nabla \cdot \vec{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \vec{B} &= 0 \\
\nabla \times \vec{E} &= -\frac{\partial \vec{B}}{\partial t} \\
\nabla \times \vec{B} &= \mu_0\vec{J} + \mu_0\varepsilon_0\frac{\partial \vec{E}}{\partial t}
\end{aligned}
$$

薛丁格方程式：

$$
i\hbar\frac{\partial}{\partial t}|\Psi\rangle = \hat{H}|\Psi\rangle
$$

## 統計學

常態分布：

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}
$$

貝氏定理：

$$
P(A|B) = \frac{P(B|A)\,P(A)}{P(B)}
$$

## 希臘字母

$$
\alpha, \beta, \gamma, \delta, \epsilon, \zeta, \eta, \theta, \iota, \kappa, \lambda, \mu, \nu, \xi, \omicron, \pi, \rho, \sigma, \tau, \upsilon, \phi, \chi, \psi, \omega
$$

$$
\Gamma, \Delta, \Theta, \Lambda, \Xi, \Pi, \Sigma, \Phi, \Psi, \Omega
$$
