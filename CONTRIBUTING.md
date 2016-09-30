0. [Open an issue](https://github.com/reactabular/reactabular/issues) to discuss the feature you want to implement or need. This will help us to figure out how to fit it in and will avoid unnecessary work on your part.
1. Implement whatever you want and write tests
2. Make sure `npm test` passes. This will run your tests and lint the code.
3. Once you are happy with the code, add yourself to the project contributors (`./CONTRIBUTORS.md`).
4. Create a PR against the `master` branch

## Development

```bash
npm run init
npm start
open http://localhost:8080
```

Now edit `./docs`.

There's also a TDD mode for testing. Run it through `npm run test:watch` and develop while it's running.

> You can run individual tests by passing a pattern like this: `npm test -- does not crash with a number`. This works also with `npm run test:watch`.
