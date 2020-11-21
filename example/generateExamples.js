const path = require('path')
const { generateMarkdownFileSystem } = require('../dist')

const setup = async () => {
  // Basic
  await generateMarkdownFileSystem({
    apiDocPath: path.resolve(__dirname, '..', 'test', '_apidoc', 'out'),
    output: path.resolve(__dirname, 'basic', 'example.md'),
    createPath: true,
    prepend: path.resolve(__dirname, '..', 'test', '_testFiles', 'prepended.md')
  })

  // Multi
  await generateMarkdownFileSystem({
    apiDocPath: path.resolve(__dirname, '..', 'test', '_apidoc', 'out'),
    output: path.resolve(__dirname, 'multi'),
    createPath: true,
    multi: true,
    prepend: path.resolve(__dirname, '..', 'test', '_testFiles', 'prepended.md')
  })
}

setup()
