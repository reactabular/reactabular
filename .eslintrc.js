module.exports = {
  "extends": ["airbnb", "prettier", "prettier/react"],
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "jasmine": true,
    "node": true
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "no-empty-pattern": 0,
    "react/jsx-filename-extension": 0,
    "comma-dangle": ["error", "never"],
    "prefer-arrow-callback": 0,
    "func-names": 0,
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": [1, { ignore: ['^reactabular'] }],
    "no-underscore-dangle": 0,
    "no-unused-expressions": 0,
    "no-use-before-define": 0,
    "react/forbid-prop-types": 0,
    "react/sort-comp": 0,
    "react/require-default-props": 0,
    "react/no-array-index-key": 0,
    "react/no-multi-comp": 0,
    "jsx-a11y/no-static-element-interactions": 0 // personal preference
  },
  "globals": {
    "jest": false
  }
};
