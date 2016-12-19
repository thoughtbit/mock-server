const fs = require('fs')
const path = require('path')

const mock = {
  // Forward 到另一个服务器
  // 'GET https://assets.daily/*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定路径
  // 'GET https://assets.daily/*': 'https://assets.online/v2/',

  // Forward 到另一个服务器，不指定来源服务器
  // 'GET /assets/*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定子路径
  // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
  // 'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home',

  // 本地文件替换
  // 'GET /local': './local.js',
}

fs.readdirSync(path.join(__dirname + '/routes')).forEach(function (file) {
  Object.assign(mock, require('./routes/' + file))
})

module.exports = mock
