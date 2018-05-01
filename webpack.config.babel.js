import * as fs from 'fs';
import * as path from 'path';

import fromPairs from 'lodash/fromPairs';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import merge from 'webpack-merge';

const pkg = require('./lerna.json');

const ROOT_PATH = path.resolve(__dirname);
const config = {
  paths: {
    indexTemplate: path.join(ROOT_PATH, 'templates', 'index.ejs'),
    build: path.join(ROOT_PATH, 'build'),
    dist: path.join(ROOT_PATH, 'dist'),
    src: path.join(ROOT_PATH, 'packages'),
    ghPages: path.join(ROOT_PATH, 'gh-pages'),
    documentation: path.join(ROOT_PATH, 'docs'),
    'js-yaml': path.join(ROOT_PATH, 'node_modules', 'js-yaml')
  }
};
const packages = fromPairs(fs.readdirSync('packages').map(p => [
  `@reactabular/${p}`, path.join(config.paths.src, p, 'src')
]));

const common = {
  entry: config.paths.documentation,
  resolve: {
    extensions: ['.js', '.jsx', '.md', '.css', '.png', '.jpg'],
    alias: {
      'js-yaml/dist/js-yaml.min.js': config.paths['js-yaml'],
      'js-yaml': config.paths['js-yaml'],
      // Reactabular aliases so that documentation and tests work
      ...packages
    }
  },
  output: {
    path: config.paths.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.md$/,
        loaders: ['catalog/loader', 'raw-loader']
      },
      {
        test: /\.png$/,
        loaders: ['url-loader?limit=100000&mimetype=image/png'],
        include: config.paths.documentation
      },
      {
        test: /\.jpg$/,
        loaders: ['file-loader'],
        include: config.paths.documentation
      },
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        include: [
          config.paths.src,
          config.paths.documentation
        ],
        exclude: /node_modules/
      }
    ]
  }
};

const commonSite = {
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: config.paths.indexTemplate,
      inject: false,
      mobile: true,
      title: pkg.name,
      appMountId: 'app'
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version)
    })
  ]
};

const developConfig = {
  entry: config.paths.documentation,
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    noInfo: true,
    stats: 'errors-only'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
};

const ghPagesConfig = {
  entry: {
    app: config.paths.documentation
  },
  output: {
    path: config.paths.ghPages,
    filename: 'js/bundle.[chunkhash].js'
  },
  plugins: [
    new CleanWebpackPlugin(['gh-pages']),
    new CopyWebpackPlugin([{
      from: './images',
      to: './images'
    }, {
      from: './CNAME',
      to: './'
    }, {
      from: './favicon.ico',
      to: './'
    }]),
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /babel-standalone|js-yaml/.test(module.resource)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    })
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        include: config.paths.documentation
      }
    ]
  }
};

module.exports = (env) => {
  process.env.BABEL_ENV = env;

  if (env === 'develop') {
    return merge(common, commonSite, developConfig);
  }


  if (env === 'build') {
    return merge(common, commonSite, ghPagesConfig);
  }

  return common;
};
