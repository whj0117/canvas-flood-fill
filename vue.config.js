/*
 * @Author: wanghongjian
 * @Date: 2022-06-11 18:02:00
 * @LastEditors: wanghongjian
 */
const path = require('path')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  chainWebpack: (config) => {
    config.resolve.alias
    .set('@assets', path.resolve(__dirname, './src/assets'))
  }
})
