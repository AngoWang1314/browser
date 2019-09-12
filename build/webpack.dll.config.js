/*
 * @desc 静态公共资源打包配置
 */

'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    // 定义程序中打包公共文件的入口文件vendor.js
    vendor: ['vue', 'vuex', 'axios', 'vue-router']
  },

  output: {
    path: path.join(__dirname, '../dll'),
    filename: '[name].js',
    library: '[name]_[hash]',
    libraryTarget: 'this'
  },

  plugins: [
    new webpack.DllPlugin({
      // 定义程序中打包公共文件的入口文件vendor.js
      context: __dirname,

      // manifest.json文件的输出位置
      path: path.join(__dirname, '../dll', '[name].manifest.json'),

      // 定义打包的公共vendor文件对外暴露的函数名
      name: '[name]_[hash]'
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
