const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    // publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loader: {
          scss: 'vue-style-loader!css-loader!sass-loader'
        }
      }
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { 
            sourceMap: true ,
            url: false
          }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
        }
      ]
    }]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),
    // Copy HtmlWebpackPlugin and change index.html for another html page
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: './index.html'
    }),
    new CopyWebpackPlugin([
      { from: PATHS.src + '/img', to: `img` },
      { from: PATHS.src + '/static' },
    ]),
  ],
}



// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

// const PATHS = {
//     src: path.join(__dirname, '../src'),
//     dist: path.join(__dirname, '../dist'),
//     assets: 'assets/'
// }

// module.exports = {

//     externals: {
//         paths: PATHS
//     },

//     entry: {
//         // app: "./src/index.js"
//         app: PATHS.src
//     },
//     output: {
//         // filename: '[name].js',
//         filename: `${PATHS.assets}js/[name].js`,
//         path: PATHS.dist,
//         // path: path.resolve(__dirname, './dist'),
//         // publicPath: '/dist'
//         publicPath: '/'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 loader: 'babel-loader',
//                 exclude: '/node_modules/'
//             },
//             {
//                 test: /\.(png|jpg|gif|svg)$/,
//                 loader: 'file-loader',
//                 options: {
//                     name: '[name].[ext]'
//                 }
//             },
//             {
//                 test: /\.scss$/,
//                 use: [
//                   'style-loader',
//                   MiniCssExtractPlugin.loader,
//                   {
//                     loader: 'css-loader',
//                     options: { sourceMap: true }
//                   }, {
//                     loader: 'postcss-loader',
//                     options: { sourceMap: true, config: { path: `src/js/postcss.config.js` } }
//                   }, {
//                     loader: 'sass-loader',
//                     options: { sourceMap: true }
//                   }
//                 ]
//             }, 
//             {
//                 test: /\.css$/,
//                 use: [
//                   'style-loader',
//                   MiniCssExtractPlugin.loader,
//                   {
//                     loader: 'css-loader',
//                     options: { sourceMap: true }
//                   }, {
//                     loader: 'postcss-loader',
//                     options: { sourceMap: true, config: { path: `src/js/postcss.config.js` } }
//                   }
//                 ]
//               }
//         ]
//     },
//     plugins: [
//         new MiniCssExtractPlugin({
//         //   filename: '[name].css',
//         filename: `${PATHS.assets}css/[name].css`,
//         }),
//         // Copy HtmlWebpackPlugin and change index.html for another html page
//         new HtmlWebpackPlugin({
//             hash: false,
//             template: `${PATHS.src}/index.html`,
//             filename: './index.html'
//         }),
//         new CopyWebpackPlugin([
//             { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
//             { from: `${PATHS.src}/static`, to: '' },
//         ]),
//     ],
// }



// // const path = require('path')

// // module.exports = {
// //   entry: {
// //     app: './src/index.js'
// //   },
// //   output: {
// //     filename: '[name].js',
// //     path: path.resolve(__dirname, './dist'),
// //     publicPath: '/dist'
// //   },
// //   module: {
// //     rules: [
// //         {
// //             test: /\.js$/,
// //             loader: 'babel-loader',
// //             exclude: '/node_modules/'
// //         }, 
// //         {
// //         test: /\.scss$/,
// //         use: [
// //             'style-loader',
// //             MiniCssExtractPlugin.loader,
// //             {
// //             loader: 'css-loader',
// //             options: { sourceMap: true }
// //             }, {
// //             loader: 'postcss-loader',
// //             options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
// //             }, {
// //             loader: 'sass-loader',
// //             options: { sourceMap: true }
// //             }
// //         ]
// //         }, 
// //         {
// //         test: /\.css$/,
// //         use: [
// //             'style-loader',
// //             MiniCssExtractPlugin.loader,
// //             {
// //             loader: 'css-loader',
// //             options: { sourceMap: true }
// //             }, {
// //             loader: 'postcss-loader',
// //             options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
// //             }
// //         ]
// //         }
// //     ]
// //   }
// // }