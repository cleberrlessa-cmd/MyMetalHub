# Padrões do MyMetalHub (aplicar sempre, inclusive em novos cursos)

Vale para `index.html`, `pt/`, `en/`, `es/` e `formacoes.html`.

## Cards de curso
- Botão **"O que irei aprender?"** → `onclick="openEmentaModal(N)"` (N = número do curso).
- Modal do curso: `<div id="modalEmentaN">` (curso 1 = `modalEmenta`) contendo a caixa `id="modalBoxN"` (curso 1 = `modalBox`),
  com conteúdo rolável `class="overflow-y-auto custom-scrollbar ..."`. Fechar: `closeEmentaModal(N)`.
- As funções são genéricas (`_toggleEmenta`) — não criar funções novas por curso; manter `openEmentaModal`/`closeEmentaModal` no script da página.
- Botão **"Amostra de Aula"** → `onclick="openAulaGratisModal(N)"` e adicionar a entrada N em `AULAS_GRATIS` (titulo + embedUrl do YouTube).

## Rolagem
- Barra de rolagem personalizada global em `assets/css/style.css` (degradê dourado→laranja→cobre). Não sobrescrever com estilos padrão.
- `assets/js/main.js` pausa o Lenis quando qualquer `[id^="modalEmenta"]` ou `#modalAulaGratis` está aberto e prende o scroll em
  elementos `.overflow-y-auto` / `.overflow-auto` / `[data-lenis-prevent]`. Novos modais devem seguir esses IDs/classes.

## Deploy
- `git commit` e `git push origin main` (ver `ATUALIZAR_SITE.bat`).
