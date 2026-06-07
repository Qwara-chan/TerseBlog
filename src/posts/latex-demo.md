---
title: LaTeX Math Demo
date: 2026-06-07
description: A showcase of LaTeX math formula rendering with KaTeX on this Astro blog.
tags: [math, latex, katex]
draft: false
---

# LaTeX Math Demo

This post demonstrates various LaTeX math formulas rendered with KaTeX.

## Calculus

### Derivatives

$$
\frac{d}{dx} \left( \int_{a}^{x} f(t)\,dt \right) = f(x)
$$

The product rule:

$$
(fg)' = f'g + fg'
$$

### Integrals

Double integral:

$$
\iint_{D} f(x,y)\,dx\,dy
$$

Line integral:

$$
\oint_{C} \vec{F} \cdot d\vec{r}
$$

## Linear Algebra

Matrix:

$$
A = \begin{pmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{pmatrix}
$$

Determinant:

$$
\det(A) = \sum_{\sigma \in S_n} \operatorname{sgn}(\sigma) \prod_{i=1}^{n} a_{i,\sigma(i)}
$$

## Physics

Maxwell's equations:

$$
\begin{aligned}
\nabla \cdot \vec{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \vec{B} &= 0 \\
\nabla \times \vec{E} &= -\frac{\partial \vec{B}}{\partial t} \\
\nabla \times \vec{B} &= \mu_0\vec{J} + \mu_0\varepsilon_0\frac{\partial \vec{E}}{\partial t}
\end{aligned}
$$

Schrödinger equation:

$$
i\hbar\frac{\partial}{\partial t}|\Psi\rangle = \hat{H}|\Psi\rangle
$$

## Statistics

Normal distribution:

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}
$$

Bayes' theorem:

$$
P(A|B) = \frac{P(B|A)\,P(A)}{P(B)}
$$

## Greek Alphabet

$$
\alpha, \beta, \gamma, \delta, \epsilon, \zeta, \eta, \theta, \iota, \kappa, \lambda, \mu, \nu, \xi, \omicron, \pi, \rho, \sigma, \tau, \upsilon, \phi, \chi, \psi, \omega
$$

$$
\Gamma, \Delta, \Theta, \Lambda, \Xi, \Pi, \Sigma, \Phi, \Psi, \Omega
$$
