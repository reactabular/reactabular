/* eslint-disable */
const ghpages = require('gh-pages');
const config = require('../webpack.config');

main();

function main() {
  ghpages.publish(config.output.path, console.error.bind(console));
}
