const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');

const catalogPkg = require('./node_modules/catalog/package.json');
const pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const config = {
  paths: {
    build: path.join(ROOT_PATH, 'build'),
    dist: path.join(ROOT_PATH, 'dist'),
    src: path.join(ROOT_PATH, 'src'),
    ghPages: path.join(ROOT_PATH, 'gh-pages'),
    documentation: path.join(ROOT_PATH, 'docs'),
    test: path.join(ROOT_PATH, 'tests'),
    'js-yaml': path.join(ROOT_PATH, 'node_modules', 'js-yaml')
  }
};

process.env.BABEL_ENV = TARGET;

const common = {
  entry: config.paths.documentation,
  resolve: {
    extensions: ['', '.js', '.jsx', '.md', '.css', '.png', '.jpg'],
    alias: {
      'js-yaml/dist/js-yaml.min.js': config.paths['js-yaml'],
      'js-yaml': config.paths['js-yaml']
    }
  },
  output: {
    path: config.paths.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.png$/,
        loaders: ['url?limit=100000&mimetype=image/png'],
        include: config.paths.documentation
      },
      {
        test: /\.jpg$/,
        loaders: ['file'],
        include: config.paths.documentation
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: [
          config.paths.src,
          config.paths.documentation
        ]
      }
    ]
  }
};

const commonSite = {
  plugins: [
    new HtmlWebpackPlugin({
      title: `${pkg.name} - ${pkg.description}`,
      template: 'lib/index_template.ejs'
    }),
    new webpack.ProvidePlugin({
      Catalog: 'catalog'
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version)
    })
  ]
};

if (TARGET === 'start') {
  module.exports = merge(common, commonSite, {
    devtool: 'eval-source-map',
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
          test: require.resolve('react'),
          loader: 'expose?React'
        }
      ]
    }
  });
}

if (TARGET === 'gh-pages' || TARGET === 'deploy-gh-pages' || TARGET === 'stats') {
  module.exports = merge(common, commonSite, {
    entry: {
      app: config.paths.documentation,
      vendor: Object.keys(catalogPkg.dependencies).concat([
        'schema2object', 'lodash', 'react', 'react-dom',
        'react-dnd', 'react-dnd-html5-backend',
        'react-ghfork', 'redux', 'uuid',
        'annogenerate', 'react-addons-update'
      ])
    },
    output: {
      path: config.paths.ghPages,
      filename: 'bundle.[chunkhash].js'
    },
    plugins: [
      new CleanWebpackPlugin(['gh-pages']),
      new CopyWebpackPlugin([{
        from: './images',
        to: './images'
      }, {
        from: './CNAME',
        to: './'
      }]),
      new webpack.DefinePlugin({
        'process.env': {
          // This has effect on the react lib size
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.CommonsChunkPlugin(
        'vendor',
        '[name].[chunkhash].js'
      )
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: config.paths.documentation
        }
      ]
    }
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
      root: '_'
    },
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    }
  }
});

if (TARGET === 'dist') {
  module.exports = merge(commonDist, {
    output: {
      path: config.paths.dist,
      filename: 'reactabular.js',
      libraryTarget: 'umd',
      library: 'Reactabular',
      sourceMapFilename: '[file].map'
    }
  });
}

if (TARGET === 'dist-min') {
  module.exports = merge(commonDist, {
    output: {
      path: config.paths.dist,
      filename: 'reactabular.min.js',
      libraryTarget: 'umd',
      library: 'Reactabular',
      sourceMapFilename: '[file].map'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}

if (TARGET === 'test' || TARGET === 'tdd' || !TARGET) {
  module.exports = merge(common, {
    entry: {}, // karma will set this
    output: {}, // karma will set this
    devtool: 'inline-source-map',
    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          loaders: ['isparta'],
          include: config.paths.src
        }
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: config.paths.test
        }
      ]
    }
  });
}
