const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: path.join(__dirname, '/src/index.jsx'),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle-[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.template.html',
      inject: 'body',
    })
  ],
};