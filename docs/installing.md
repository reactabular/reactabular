Reactabular has been designed to be consumed primarily through npm although it's possible to use a specific standalone bundle instead.

## Consuming Through npm

The npm version doesn't have any direct dependencies. Instead, it relies on `peerDependencies` - React and Lodash. If you are using Lodash 4, it should just work after you `npm install reactabular` to your project.

### Making Reactabular Work with Lodash 3

Even though Lodash range goes to 3, you will need to tweak your build a little to make it work as Reactabular relies on Lodash 4 style imports listed below:

* `import get from 'lodash/get';`
* `import has from 'lodash/has';`
* `import isEqual from 'lodash/isEqual';

You should alias these imports so that they work in your environment. In Webpack you can achieve this through the [resolve.alias](https://webpack.github.io/docs/configuration.html#resolve-alias) field.

## Consuming as a Standalone

The [source repository](https://github.com/reactabular/reactabular) contains a `dist` directory. It's actually included within the npm version as well if you want to alias to it instead of the default version (separate modules). The `dist` comes in non-minified (`.js`) and minified (`.min.js`) variants and both have sourcemaps available.

Reactabular has been packaged in the UMD format. This means you can consume it from CommonJS, AMD, and global environment. If you use the global environment, you'll find Reactabular there as `Reactabular`.

## Building from the Source

If you want to build Reactabular from the source, follow the instructions below:

1. `git clone https://github.com/reactabular/reactabular.git`
2. `npm install`
3. `npm run dist`, `npm run dist-min`, or `npm run dist-modules`

Both `dist` and `dist-min` generate below `./dist` whereas `dist-modules` generates below the `./dist-modules` directory.
