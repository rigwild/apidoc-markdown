import path from 'path'
import { generateMarkdownFileSystem } from '../../src'

// The following will generate the `./example.md` file.
export default () =>
  generateMarkdownFileSystem({
    // Path to apiDoc data directory
    apiDocPath: path.resolve(__dirname, '..', '_apiDocData', 'out'),

    // Output path
    output: path.resolve(__dirname, 'example.md'),

    // Template path
    template: path.resolve(__dirname, '..', '..', 'templates', 'default.md'),

    // File to preprend documentation with
    prepend: undefined,

    // Should the documentation be generated one file per group
    multi: false,

    // Should the path to output path be recursively generated (mkdir -p)
    createPath: false
  })
