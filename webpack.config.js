const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: '[name].js',
        // filename: 'app.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.scss$/,
                use: [
                  'style-loader',
                  MiniCssExtractPlugin.loader,
                  {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                  }, {
                    loader: 'postcss-loader',
                    options: { sourceMap: true, config: { path: `src/js/postcss.config.js` } }
                  }, {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                  }
                ]
            }, 
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  MiniCssExtractPlugin.loader,
                  {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                  }, {
                    loader: 'postcss-loader',
                    options: { sourceMap: true, config: { path: `src/js/postcss.config.js` } }
                  }
                ]
              }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css',
        }),
    ],
    devServer: {
        overlay: true
    }
}