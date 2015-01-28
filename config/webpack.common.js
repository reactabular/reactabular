'use strict';


module.exports = {
    entry: [
        './demos/index'
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.md', '.css', '.png', '.jpg'],
    },
};

module.exports.loaders = [
    {
        test: /\.css$/,
        loaders: ['style', 'css'],
    },
    {
        test: /\.md$/,
        loader: 'html!../loaders/markdown',
    },
    {
        test: /\.png$/,
        loader: 'url-loader?limit=100000&mimetype=image/png',
    },
    {
        test: /\.jpg$/,
        loader: 'file-loader',
    },
];
