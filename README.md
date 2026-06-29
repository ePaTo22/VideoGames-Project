# PlayIndex

PlayIndex is a polished Next.js portfolio app for discovering free-to-play videogames. It replaces the old bootcamp RAWG/Postgres project with a safer, lighter catalog powered by [FreeToGame](https://www.freetogame.com/api-doc).

## Features

- Search by title, description, or publisher.
- Filter by genre and platform.
- Sort by featured order, title, newest, or oldest.
- Load-more pagination for fast browsing.
- Detail pages with screenshots, metadata, and FreeToGame attribution.
- Local saved games using `localStorage`.
- No API keys, database credentials, Axios, Redux, Express, Sequelize, or CRA.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vitest
- Native `fetch`

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run test
npm run build
npm audit
```

FreeToGame data is fetched server-side and cached with Next.js revalidation.
