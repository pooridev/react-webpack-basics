const webpack = require('webpack');

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: path.join(__dirname, './src/index'),

  // Where files should be sent once they are bundled
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'index.bundle.js'
  },

  devtool: isDev ? 'source-map' : false,

  watch: isDev,

  // webpack 5 comes with devServer which loads in development mode
  devServer: {
    port: 3000,
    hot: true
  },

  // Rules of how webpack will take our files, complie & bundle them for the browser
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.jsx', '.js', '.css']
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CompressionPlugin({
      algorithm: 'brotliCompress',
      test: /\.(js|jsx|css|html|svg)$/,
      compressionOptions: { level: 9 },
      deleteOriginalAssets: false
    })
  ]
};
