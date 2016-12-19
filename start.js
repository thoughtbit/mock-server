const env = process.env.NODE_ENV || 'development'
require('babel-polyfill')
if (env === 'development') {
  require('babel-register')
}

require('./index.js')
