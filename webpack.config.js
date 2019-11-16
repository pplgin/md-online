const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const __isDEV = process.env.NODE_ENV !== 'production';

let rendererConfig = {
  entry: {
    app: './src/index.js'
  },
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[hash:8].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.styl', '.css'] // 可以省略的后缀名
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: __isDEV ? '[name].css' : '[name].[hash:8].css',
      chunkFilename: __isDEV ? '[id].css' : '[id].[hash:8].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      chunksSortMode: 'none'
    })
  ]
};

if (__isDEV) {
  rendererConfig = Object.assign(rendererConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: [path.join(__dirname, './public'), path.join(__dirname, './dist')],
      compress: true,
      port: 9000
    }
  });
}

module.exports = rendererConfig;
