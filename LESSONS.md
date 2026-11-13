# Lessons and Guidelines

Rules and lessons for working on this project. Claude should follow these in every session. Add a new entry whenever a lesson is learned or a preference is stated, and say why when it isn't obvious.

## Testing

- **Don't test in the browser unless asked.** Freyja does the in-browser testing herself, and driving the app through clicks and screenshots is slow and uses a lot of tokens. Don't start the preview server or use the browser tools to check a change unless she asks for it in that message. A passing build is enough to hand a change back.
- **Do keep writing unit tests.** Add unit tests for new logic, especially calculations and anything that cleans or converts data, and run them before handing the work back. Note: `src/setupTests.js` imports `@testing-library/jest-dom`, which isn't installed, so run Jest with that setup file bypassed (an empty file passed through `--setupFilesAfterEnv`) or install the package.

## Tooling

- **A stale lint cache can fake build errors.** If `react-scripts build` reports an unused variable or import that is clearly not there, delete `node_modules/.cache/.eslintcache` and `node_modules/.cache/eslint-webpack-plugin` and build again.

## Workflow

- **Never ask about committing or pushing.** Freyja handles git commits and pushes herself. Don't offer to commit, don't ask whether to commit, and don't suggest a commit as the next step, including in wrap-up questions or buttons. Only run git commands that change history or the remote if she explicitly asks for them in that message.
