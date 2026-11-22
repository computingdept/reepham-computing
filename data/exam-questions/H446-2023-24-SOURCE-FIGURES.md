# H446 2023–2024 — source-specific diagram batch

**Draft QA only. No H446/J277 student lessons, CSS/JS, assignments, or scoring modified.**

This batch addresses **four high-value source-specific visual families** identified by the consolidated [five-series audit](https://github.com/computingdept/reepham-computing/pull/159) rather than polishing generic teaching artwork. Eight independently authored SVGs are created, four question screens and four separate full-answer reveals.

| Paper/part | Question-only view | Complete answer view |
| --- | --- | --- |
| June 2023 H446/02 Q1(a)(ii), 4 marks | Insert order `42,24,12,68,75,31,17` with blank tree workspace | Root 42, 24 left, 68 right; 12/31 below 24, 17 right of 12, 75 right of 68 |
| June 2023 H446/02 Q1(a)(v), 4 marks | Letter family tree with root M, F/T, leaves C/H/R/W; no traversal revealed | Post-order `C,H,F,R,W,T,M` and rank labels |
| June 2023 H446/02 Q1(b), 6 marks | Seven directed sites P–V and the ten exact RHS edges/costs | Highlighted `P→S→V`, cost 14; final g/predecessors shown for every site |
| June 2024 H446/01 Q5(a), 4 marks | Inputs A front motion, B rear motion, C armed, D test and empty circuit canvas | OR(A,B); NOT(D); two two-input AND gates; siren `S=(A OR B) AND C AND NOT D` |

The existing generic Dijkstra/BST/logic diagrams in the main repo are **not interchangeable** with these RHS scenarios. In particular, 2023 Dijkstra uses directed sites P,Q,R,S,T,U,V, rather than the six-node S,A,B,C,D,T main-branch graph.

[The eight-row batch map](h446-2023-24-source-figures-map.csv) explicitly records each question/answer asset role. All eight remain `disabled_not_approved`. A GitHub Actions workflow independently XML-parses/rasterises the files and archives real PNG evidence. Rendering does **not** imply question-source, marking-scheme, projector-readability or teacher sign-off.

**Next batch:** inspect 2022 museum BST and eight-node countryside graph and 2024 museum A*; the generic main SVGs have different node/value data and cannot be reused without a source-specific redraw.
