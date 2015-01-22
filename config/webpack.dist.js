'use strict';
var extend = require('xtend');

var common = require('./webpack.common.dist');


module.exports = extend(common, {
    output: {
        path: './dist',
        filename: 'reactabular.js',
        libraryTarget: 'umd',
        library: 'Reactabular',
    },
});
