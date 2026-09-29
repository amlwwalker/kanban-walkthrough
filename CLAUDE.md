# pricing

## How this project is built

Work is tracked on [the board](https://github.com/users/amlwwalker/projects/8) and follows the `kanban-tdd` plugin:
a ticket before code, the user story agreed before the technical design, a
failing test committed before the code that passes it, and a written manual
step for anything only a human can confirm.

Start anything, whether a feature, a bug or a loose idea, with `feature-workflow`.

Project specifics that the plugin cannot know:

- Tests are vitest, run with `npm test`. Test files live next to the code as `src/**/*.test.js`.
- This repo is the `pricing` service. Tickets carry `svc:pricing`, and checkout work carries `area:checkout`.
- Promotion is a PR per environment: feature branch to `dev`, then `dev` to `staging`, then `staging` to `main`. Never push directly to any of those three.
- Logging is console only for now: `console.log('[Pricing]', message, meta)`. Never log card details or customer names; nothing is sanitised automatically.
- Prose is British English and em dashes are forbidden.
