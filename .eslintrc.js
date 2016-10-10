module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "comma-dangle": ["error", "never"], // personal preference
    "prefer-arrow-callback": 0, // mocha tests (recommendation)
    "func-names": 0, // mocha tests (recommendation)
    "import/extensions": 0, // skip import extensions
    "import/no-extraneous-dependencies": 0, // monorepo setup
    "import/no-unresolved": [1, { ignore: ['^reactabular'] }], // monorepo setup
    "no-underscore-dangle": 0, // implementation detail (_highlights etc.)
    "no-unused-expressions": 0, // chai
    "no-use-before-define": 0, // personal preference
    "react/forbid-prop-types": 0, // TODO: re-enable this later
    "react/sort-comp": 0, // personal preference
    "react/no-multi-comp": 0, // personal preference
    "jsx-a11y/no-static-element-interactions": 0 // personal preference
  }
};
