var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

var ROOT_PATH = path.resolve(__dirname);
var TARGET = process.env.npm_lifecycle_event;

var common = {
  entry: path.resolve(ROOT_PATH, 'src/js/index.js'),
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.resolve(ROOT_PATH, 'bin'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: path.resolve(ROOT_PATH, 'src')
      },
	  {
		test: /\.(png|jpg)$/, 
		loader: 'url-loader?limit=8192'
	  }
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: 'Haxe Webpack app'
    })
  ]
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    module: {
      loaders: [
        {
          test: /\.js?$/,
          loaders: ['react-hot'],
          include: path.resolve(ROOT_PATH, 'src/js')
        }
      ]
    }
  });
}

