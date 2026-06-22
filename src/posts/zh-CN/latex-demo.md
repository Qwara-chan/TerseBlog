---
title: LaTeX 数学演示
date: 2026-06-07
description: 展示本 Astro 博客使用 KaTeX 渲染 LaTeX 数学公式的效果。
tags: [数学, latex, katex]
draft: false
---

# LaTeX 数学演示

本文演示了使用 KaTeX 渲染的各种 LaTeX 数学公式。

## 微积分

### 导数

$$
\frac{d}{dx} \left( \int_{a}^{x} f(t)\,dt \right) = f(x)
$$

乘法法则：

$$
(fg)' = f'g + fg'
$$

### 积分

二重积分：

$$
\iint_{D} f(x,y)\,dx\,dy
$$

线积分：

$$
\oint_{C} \vec{F} \cdot d\vec{r}
$$

## 线性代数

矩阵：

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

麦克斯韦方程组：

$$
\begin{aligned}
\nabla \cdot \vec{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \vec{B} &= 0 \\
\nabla \times \vec{E} &= -\frac{\partial \vec{B}}{\partial t} \\
\nabla \times \vec{B} &= \mu_0\vec{J} + \mu_0\varepsilon_0\frac{\partial \vec{E}}{\partial t}
\end{aligned}
$$

薛定谔方程：

$$
i\hbar\frac{\partial}{\partial t}|\Psi\rangle = \hat{H}|\Psi\rangle
$$

## 统计学

正态分布：

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}
$$

贝叶斯定理：

$$
P(A|B) = \frac{P(B|A)\,P(A)}{P(B)}
$$

## 希腊字母

$$
\alpha, \beta, \gamma, \delta, \epsilon, \zeta, \eta, \theta, \iota, \kappa, \lambda, \mu, \nu, \xi, \omicron, \pi, \rho, \sigma, \tau, \upsilon, \phi, \chi, \psi, \omega
$$

$$
\Gamma, \Delta, \Theta, \Lambda, \Xi, \Pi, \Sigma, \Phi, \Psi, \Omega
$$
