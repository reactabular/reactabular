var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './demos/index'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/demos/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)*$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style', 'css'] },
    ]
  }
};
