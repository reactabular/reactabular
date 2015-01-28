'use strict';

var ghpages = require('gh-pages');

var config = require('./webpack.gh-pages');


main();

function main() {
    ghpages.publish(config.output.path, console.error.bind(console));
}
