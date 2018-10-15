const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const miniCssPlugin = new MiniCssExtractPlugin({
    filename: "styles/[name].css"
  });

module.exports = {
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
      test: /\.css/,
      use: [
        'css-hot-loader',
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    },
    {
      test: /\.less$/,
      loaders: [
          "style", "css", "less"
        ]
      },
      {
        test: /\.(png|jpeg|jpg|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  plugins: [htmlPlugin, miniCssPlugin]
};
