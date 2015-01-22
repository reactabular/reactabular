'use strict';
// adapted based on https://github.com/gpbl/isomorphic-react-template
var extend = require('xtend');
var webpack = require('webpack');

var common = require('./webpack.common');


module.exports = extend(common, {
    entry: [
        './demos/index'
    ],
    output: {
        path: './dist',
        filename: 'bundle.js',
        publicPath: '/demos/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        }),
    ],
    module: {
        loaders: common.loaders.concat([{
            test: /\.(js|jsx)$/,
            loaders: ['jsx?harmony'],
            exclude: /node_modules/,
        }])
    }
});