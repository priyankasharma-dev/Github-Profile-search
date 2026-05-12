# GitHub Search Detective

A lightweight React + Vite app for inspecting GitHub user profiles and top repositories.

Built with:
- React 19
- Vite 4+ for fast development and optimized builds
- Axios for GitHub API requests
- React Icons for clean UI indicators

## What it does

Enter a GitHub username and the app will fetch:
- public user profile details
- avatar, bio, followers, following, location, company, and Twitter handle
- top 6 repositories by star count
- recent searches stored locally for quick recall

## Features

- GitHub user lookup with debounced search input
- Top repositories preview with stars, forks, language, and description
- Search history persisted in `localStorage`
- Error state when a username is not found
- Responsive card-style layout and icon-driven UI

## Getting started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local Vite URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint the project

```bash
npm run lint
```

## Project structure

- `src/App.jsx` — root component
- `src/components/github.jsx` — GitHub search UI and API logic
- `src/components/github.css` — styling for the search app
- `src/main.jsx` — app entry point
- `vite.config.js` — Vite configuration

## Notes

- This app uses the GitHub public API, so rate limiting may apply for large numbers of requests.
- The search field supports pressing Enter to query the current username.
- Search history persists across refreshes using `localStorage`.
