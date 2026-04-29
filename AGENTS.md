# Repository Guidelines

## Project Structure & Module Organization
This app is a Vite React frontend with Redux Toolkit state under `src/store` and `src/features/tasks/store`. The task feature is organized by responsibility: `components` renders task UI, `hooks` wraps dispatch/selector usage for the feature API, `src/features/tasks/store/selectors.ts` centralizes derived state with `createSelector`, and `index.ts` is the public barrel used by the rest of the app. Persistence is not handled by middleware; `src/features/tasks/store/tasksSlice.ts` writes task updates directly through `src/utils/localStorage.ts`, so changes to reducer behavior can affect storage side effects immediately. Shared form primitives such as `Input`, `Select`, `Button`, and `Badge` live in `src/components/ui`.

## Build, Test, and Development Commands
Use `npm run dev` for the local Vite server, `npm run build` for a production bundle, `npm run preview` to serve the built output, and `npm run lint` to run ESLint. There is no test script or test framework configured in `package.json` right now, so there is no supported command for running the full suite or a single test file yet.

## Coding Style & Naming Conventions
The codebase uses ES modules throughout. Follow the existing TypeScript React style: function components, hooks-based feature APIs, and type-only imports where practical. Redux state is composed in `src/store/store.ts`, while feature exports should be surfaced through the relevant barrel file instead of deep imports. ESLint is configured through `eslint.config.js` with `@eslint/js`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`; the current config only targets `**/*.{js,jsx}`, so if you expand lint coverage to `ts` or `tsx`, update the config deliberately rather than assuming it already applies. Tailwind v4 is wired through `postcss.config.js`, with source scanning defined in `tailwind.config.js`.

## Testing Guidelines
Automated tests are not set up yet. When adding a test runner, add the script to `package.json` first so future contributors have a canonical way to run all tests and a single spec.

## Commit & Pull Request Guidelines
Recent commits follow Conventional Commit prefixes such as `feat(tasks): ...`, `feat(ui): ...`, `refactor(tasks): ...`, `fix(ui): ...`, and `chore: ...`. Keep that pattern, scope commits when the change is feature-specific, and write messages in the imperative mood. No pull request template is present in the repository, so PRs should at minimum summarize the user-facing change, list validation performed, and call out any follow-up work.
