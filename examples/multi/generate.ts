import path from 'path'
import { generateMarkdownFile } from '../../src'

// The following will generate one file per group.

export default () =>
  generateMarkdownFile({
    // Path to apiDoc data directory
    apiDocPath: path.resolve(__dirname, '..', '_apiDocData'),
    // Output path
    output: path.resolve(__dirname, 'output'),
    // Template path
    template: path.resolve(__dirname, '..', '..', 'templates', 'default.md'),
    // File to preprend documentation with
    prepend: null,
    // Should the documentation be generated one file per group
    multi: true,
    // Should the path to output path be recursively generated (mkdir -p)
    createPath: true
  })
