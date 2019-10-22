const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const port = process.env.port || process.env.npm_config_port || 8080

module.exports = {
  productionSourceMap: false,
  devServer: {
    port: port,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        // target: 'http://rap2api.taobao.org/app/mock/233221/',
        // target: 'http://www.doclever.cn:8090/mock/5da19a6f4a9da91cd6547af2/',
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    after: require('./mock/mock-serve.js')
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))

    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}
