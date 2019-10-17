'use strict'

// The following script will generate the `./example.md` file

const r = require('path').resolve

require('../../dist').generateMarkdownFile({
  apiDocPath: r(__dirname), // Path to apiDoc data directory
  output: r(__dirname, 'example.md'), // Output path
  template: r(__dirname, '..', '..', 'templates', 'default.md'), // Template path
  prepend: null, // File to preprend documentation with
  multi: false, // Should the documentation be generated one file per group
  createPath: false // Should the path to output path be recursively generated (mkdir -p)
})
