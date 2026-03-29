# Instagram Clone

Production-ready Instagram-style social application built with React and Firebase.

## Overview

This project provides a modern single-page experience for authentication, profile browsing, media posts, likes, and comments.
The frontend is built with React and Chakra UI, while Firebase provides authentication, database, and storage services.

## Core Features

- User authentication and protected routes
- Global feed sorted by newest posts
- Profile pages resolved by username
- Post creation with image or video URLs
- Like and comment interactions with atomic Firestore updates
- Shared client state using Zustand stores
- Responsive UI powered by Chakra UI

## Technology Stack

- React 19
- Vite 8
- React Router
- Chakra UI
- Framer Motion
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Zustand

## Architecture Summary

1. Bootstrapping and providers
- The app starts in `src/main.jsx` with `BrowserRouter` and `ChakraProvider`.

2. Authentication and route protection
- `src/App.jsx` uses Firebase auth state to protect `/` and redirect unauthenticated users to `/auth`.

3. Data layer
- Firestore collections store users and posts.
- Hooks query and mutate Firestore, while Zustand stores keep UI state synchronized.

4. Post lifecycle
- Post creation writes documents to the `posts` collection.
- User documents are updated with created post identifiers.
- Likes and comments are applied via Firestore atomic array operations.

## Repository Structure

Top-level app directory:

- `src/components` reusable UI components
- `src/pages` route-level pages
- `src/hooks` data fetching and mutation hooks
- `src/store` Zustand state stores
- `src/firebase` Firebase initialization
- `src/Layouts` layout wrappers
- `src/utils` helper functions

## Prerequisites

- Node.js 18 or later (Node.js 20 LTS recommended)
- npm 9 or later
- Firebase project with Authentication, Firestore, and Storage enabled

## Getting Started

Run all commands from the app root (`Instagram`).

```bash
npm install
copy .env.example .env
npm run dev
```

## Environment Configuration

Create `.env` in the app root and configure:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

If values are missing, the app uses demo placeholders and logs a warning.

## Available Scripts

- `npm run dev` start development server
- `npm run build` build production assets into `dist`
- `npm run preview` preview the production build
- `npm run lint` run ESLint checks

## Deployment

### Render

Deployment is preconfigured through workspace-level `render.yaml`:

- Static site runtime
- Root directory set to `Instagram`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- SPA rewrite to `index.html`

### Vercel

SPA route rewrites are configured in `vercel.json`.

Recommended Vercel setup:

1. Import repository.
2. Set root directory to `Instagram`.
3. Add all `VITE_FIREBASE_*` variables.
4. Deploy.

## Operational Notes

- Keep Firebase rules aligned with your authorization model.
- Validate media URLs before publishing posts.
- Use least-privilege Firebase security rules in production.

## Troubleshooting

- Auth or data errors usually indicate missing/invalid Firebase environment variables.
- If direct URL refresh fails in production, confirm SPA rewrites are enabled on host.
- If build tooling becomes inconsistent, remove `node_modules` and reinstall dependencies.

## Contributing

1. Create a feature branch.
2. Make focused, testable changes.
3. Run lint and build checks before opening a pull request.
4. Provide a concise change summary and testing notes.

## License

No license file is currently included in this repository.
