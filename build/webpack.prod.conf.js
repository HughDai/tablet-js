
const config = require('../config')
const utils = require('./utils')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ProgressWebpackPlugin = require('progress-bar-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('[chunkhash].[name].js'),
    chunkFilename: utils.assetsPath('[chunkhash].[name].js'),
    sourceMapFilename: utils.assetsPath('[chunkhash].[name].js.map'),
    publicPath: config.build.assetsPublicPath,
    chunkLoadTimeout: config.build.chunkLoadTimeout
  },
  plugins: [
    new ProgressWebpackPlugin(),
    new CleanWebpackPlugin()
  ]
})
