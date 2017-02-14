/*
 * WARNING: Tampering with how entry is populated could affect pattern matching
 */

const fs = require('fs')
const path = require('path')
const minimatch = require('minimatch')

const env = process.env.NODE_ENV || 'development'
const pattern = process.env.PATTERN || '*'

const entry = fs.readdirSync('functions')
  .filter(minimatch.filter(pattern))
  .reduce((map, funcName) => {
    map[funcName] = path.resolve(`functions/${funcName}/index`)
    return map
  }, {})

module.exports = {
  target: 'node',
  entry,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' }
        ]
      }
    ]
  },
  output: {
    path: 'dist',
    filename: '[name]/index.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    modules: [ 'node_modules', 'lib' ]
  }
}
