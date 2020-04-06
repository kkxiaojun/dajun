const path = require('path')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle1.js',
    path: path.resolve(__dirname, 'dist')
  }
}