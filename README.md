# Guia de Teoria Musical

Guia interativo de teoria musical em **português**, com áudio gerado no navegador via [Tone.js](https://tonejs.github.io/). Pensado como material de estudo navegável, com exemplos sonoros clicáveis para intervalos, escalas, acordes e progressões.

## Stack

- [Vite](https://vite.dev/) — bundler e dev server
- [React 19](https://react.dev/) — UI
- [Tailwind CSS v4](https://tailwindcss.com/) — estilização utility-first (via `@tailwindcss/vite`)
- [Tone.js](https://tonejs.github.io/) — síntese e reprodução de áudio no navegador

## Rodando o projeto

```bash
npm install
npm run dev
```

O servidor sobe em `http://localhost:5173`.

Para gerar o build de produção:

```bash
npm run build
npm run preview
```

## Estrutura

- `src/MusicTheoryGuide.jsx` — componente principal do guia (conteúdo didático + interações de áudio)
- `src/App.jsx` — monta o `MusicTheoryGuide` como componente raiz
- `src/index.css` — importa o Tailwind (`@import "tailwindcss"`)
- `vite.config.js` — plugins `@vitejs/plugin-react` e `@tailwindcss/vite`

## Áudio

O Tone.js exige interação do usuário antes de iniciar o `AudioContext` (política dos navegadores). Os botões do guia disparam `Tone.start()` na primeira interação — basta clicar em qualquer exemplo sonoro para habilitar o áudio.
