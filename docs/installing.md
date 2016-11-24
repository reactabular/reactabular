Reactabular has been designed to be consumed primarily through npm although it's possible to use a specific standalone bundle instead.

## Consuming Through npm

The default npm version (`reactabular`) doesn't have any direct dependencies. Instead, it relies on `peerDependencies` - React and Lodash. If you are using Lodash 4, it should just work after you `npm install reactabular` to your project.

If you want to consume something more granular, it's possible to use separate packages instead. You can [see the available ones through npm](https://www.npmjs.com/browse/keyword/reactabular).

## Consuming as a Standalone

The [source repository](https://github.com/reactabular/reactabular) contains a `dist` directory. It's actually included within the npm version as well if you want to alias to it instead of the default version (separate modules). The `dist` comes in non-minified (`.js`) and minified (`.min.js`) variants and both have sourcemaps available.

Reactabular has been packaged in the UMD format. This means you can consume it from CommonJS, AMD, and global environment. If you use the global environment, you'll find Reactabular there as `Reactabular`.

## Consuming through GitHub

If you want to point to a custom version of Reactabular, you can do this by pointing to GitHub through `package.json` like this:

```json
{
  ...
  "dependencies": {
    ...
    "reactabular": "git+https://github.com/reactabular/reactabular.git",
    ...
  },
  ...
}
```

Another way to achieve the same results would be to publish a custom version of your own through npm using [npm scopes](https://docs.npmjs.com/misc/scope).

## Building from the Source

If you want to build Reactabular from the source, follow the instructions below:

1. `git clone https://github.com/reactabular/reactabular.git`
2. `npm install`
3. `npm run dist`, `npm run dist-min`, or `npm run dist-modules`

Both `dist` and `dist-min` generate below `./dist` whereas `dist-modules` generates below the `./dist-modules` directory.
