const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const devMode = process.env.NODE_ENV !== 'production';
const distPath = path.join(__dirname, '../dist');

const staticPath = 'static';

const clientConfig = {
  target: 'web',
  entry: './src/index.js',
  stats: 'errors-warnings',
  bail: true,
  output: {
    filename: devMode
      ? 'js/[name].bundle.js'
      : 'js/[name].[hash].bundle.js',
    path: path.resolve(distPath, staticPath),
    publicPath: '/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
      ignoreOrder: true
    }),
    new LoadablePlugin({ filename: 'stats.json', writeToDisk: true }),
    new CopyPlugin([
      { from: 'public' }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode
            }
          },
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer
              ]
            }
          }
        ]
      }
    ]
  }
};

const serverConfig = {
  target: 'node',
  entry: './src/server/index.js',
  stats: 'errors-warnings',
  bail: true,
  output: {
    path: path.resolve(distPath),
    filename: 'server.js',
    publicPath: '/'
  },
  node: {
    __dirname: true
  },
  externals: [nodeExternals()],
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
};

module.exports = { clientConfig, serverConfig };
