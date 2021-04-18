const path = require('path')
const { generateMarkdownFileSystem } = require('../dist')

const apiDocPath = path.resolve(__dirname, '..', 'test', '_apidoc', 'out')
const header = path.resolve(__dirname, '..', 'test', '_testFiles', 'header.md')
const footer = path.resolve(__dirname, '..', 'test', '_testFiles', 'footer.md')
const prepend = path.resolve(__dirname, '..', 'test', '_testFiles', 'prepend.md')

const setup = async () => {
  // Basic
  await generateMarkdownFileSystem({
    apiDocPath,
    output: path.resolve(__dirname, 'basic', 'example.md'),
    createPath: true,
    header,
    footer,
    prepend
  })

  // Multi
  await generateMarkdownFileSystem({
    apiDocPath,
    output: path.resolve(__dirname, 'multi'),
    createPath: true,
    multi: true,
    header,
    footer,
    prepend
  })
}

setup()
