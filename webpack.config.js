const path = require('path')

module.exports = {
  entry:[
      './js/component.js',
      './js/video.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}