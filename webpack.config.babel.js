const path = require('path');

const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const Clean = require('clean-webpack-plugin');
const merge = require('webpack-merge');

const pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const config = {
  paths: {
    package: path.join(ROOT_PATH, 'package.json'),
    build: path.join(ROOT_PATH, 'build'),
    dist: path.join(ROOT_PATH, 'dist'),
    src: path.join(ROOT_PATH, 'src'),
    ghPages: path.join(ROOT_PATH, 'gh-pages'),
    demo: path.join(ROOT_PATH, 'demos'),
    test: path.join(ROOT_PATH, 'tests'),
  },
};

process.env.BABEL_ENV = TARGET;

const common = {
  entry: config.paths.demo,
  resolve: {
    extensions: ['', '.js', '.jsx', '.md', '.css', '.png', '.jpg', '.json'],
  },
  output: {
    path: config.paths.build,
    filename: 'bundle.js',
  },
  resolveLoader: {
    alias: {
      markdown: path.join(ROOT_PATH, 'loaders/markdown'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.md$/,
        loaders: ['html', 'markdown'],
      },
      {
        test: /\.png$/,
        loaders: ['url?limit=100000&mimetype=image/png'],
        include: config.paths.demo,
      },
      {
        test: /\.jpg$/,
        loaders: ['file'],
        include: config.paths.demo,
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: config.paths.src,
      },
      {
        test: /\.json$/,
        loader: 'json',
        include: config.paths.package,
      },
      {
        test: require.resolve('catalog'),
        loader: 'expose?Catalog',
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/^(buffertools)$/), // unwanted "deeper" dependency
  ],
};

const commonSite = {
  plugins: [
    new HtmlwebpackPlugin({
      title: `${pkg.name} - ${pkg.description}`,
      template: 'lib/index_template.ejs',
    }),
    new webpack.ProvidePlugin({
      Catalog: 'catalog',
    }),
  ],
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, commonSite, {
    devtool: 'eval-source-map',
    entry: config.paths.demo,
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: config.paths.demo,
        },
      ],
    },
  });
}

if (TARGET === 'gh-pages' || TARGET === 'deploy-gh-pages') {
  module.exports = merge(common, commonSite, {
    entry: {
      app: config.paths.demo,
      vendors: [
        'react',
        'lodash',
      ],
    },
    output: {
      path: config.paths.ghPages,
      filename: 'bundle.[chunkhash].js',
    },
    plugins: [
      new Clean(['gh-pages']),
      new webpack.DefinePlugin({
        'process.env': {
          // This has effect on the react lib size
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      new webpack.optimize.CommonsChunkPlugin(
                'vendors',
                '[name].[chunkhash].js'
            ),
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: config.paths.demo,
        },
      ],
    },
  });
}

const commonDist = merge(common, {
  devtool: 'source-map',
  entry: './src',
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: '_',
      root: '_',
    },
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
  },
});

if (TARGET === 'dist') {
  module.exports = merge(commonDist, {
    output: {
      path: config.paths.dist,
      filename: 'reactabular.js',
      libraryTarget: 'umd',
      library: 'Reactabular',
      sourceMapFilename: '[file].map',
    },
  });
}

if (TARGET === 'dist-min') {
  module.exports = merge(commonDist, {
    output: {
      path: config.paths.dist,
      filename: 'reactabular.min.js',
      libraryTarget: 'umd',
      library: 'Reactabular',
      sourceMapFilename: '[file].map',
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ],
  });
}

if (TARGET === 'test' || TARGET === 'tdd') {
  module.exports = merge(common, {
    entry: {}, // karma will set this
    output: {}, // karma will set this
    devtool: 'inline-source-map',
    resolve: {
      alias: {
        src: config.paths.src,
      },
    },
    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          loaders: ['isparta-instrumenter'],
          include: config.paths.src,
        },
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: config.paths.test,
        },
      ],
    },
  });
}
