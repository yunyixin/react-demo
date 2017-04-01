const webpack = require('webpack');
const definePlugin = require('webpack/lib/DefinePlugin');

// webpack plugins
const providePlugin = require('webpack/lib/ProvidePlugin');
const commonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const path = require('path');
const autoprefixer = require('autoprefixer');
const env = require('./env');

module.exports = {
  devtool: 'inline-source-map',

  entry: {
    app: './src/index.js',
    vendor: ['./src/vendor.js']
  },

  output: {
    path: path.resolve(__dirname, './static/dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id]-chunk.js'
  },

  resolve: {
    extensions: ['.js', '.scss', '.json'],
    modules: ['node_modules', 'src']
  },

  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[name]__[local]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer];
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true,
              includePaths: [path.resolve(__dirname, './src')]
            }
          }
        ]
      },

      {
        test: /\.json$/,
        use: 'json-loader'
      },

      {
        test: /\.(woff|woff2)(\?[v=\d\.]+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },

      {
        test: /\.ttf(\?[v=\d\.]+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },

      {
        test: /\.eot(\?[v=\d\.]+)?$/,
        use: 'file-loader'
      },

      {
        test: /\.svg(\?[v=\d\.]+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },

      {
        test: /\.png$/,
        use: 'url-loader?limit=10240&mimetype=image/png'
      }
    ]
  },

  plugins: [
    new providePlugin({
      'React': 'react'
    }),
    new commonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new definePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      },
      __DEVELOPMENT__: true,
       __ENVIRONMENT__: "'" + process.env.ENVIRONMENT + "'",
    })
  ],

  devServer: {
    quiet: true,
    port: (env.devServer.port + 1) || 3001,
    host: env.devServer.host || 'localhost',
    open: false,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }

};