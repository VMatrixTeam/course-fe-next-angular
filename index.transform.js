const { minify } = require('html-minifier');

module.exports = (targetOptions, indexHtml) =>
  minify(indexHtml, {
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true
  });
