'use strict'

// The following script will generate `./User.md` and `./Post.md` files

const r = require('path').resolve

require('../../dist').generateMarkdownFile({
  // Path to apiDoc data directory
  apiDocPath: r(__dirname),
  // Output path
  output: r(__dirname, 'output'),
  // Template path
  template: r(__dirname, '..', '..', 'templates', 'default.md'),
  // File to preprend documentation with
  prepend: null,
  // Should the documentation be generated one file per group
  multi: true,
  // Should the path to output path be recursively generated (mkdir -p)
  createPath: true
})
