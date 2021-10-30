// @ts-check
const path = require('path')
const { generateMarkdownFileSystem } = require('../dist')

const input = path.resolve(__dirname, '..', 'test', '_testFiles', 'input')
const header = path.resolve(__dirname, '..', 'test', '_testFiles', 'header.md')
const footer = path.resolve(__dirname, '..', 'test', '_testFiles', 'footer.md')
const prepend = path.resolve(__dirname, '..', 'test', '_testFiles', 'prepend.md')

const setup = async () => {
  // Basic
  await generateMarkdownFileSystem({
    input,
    output: path.resolve(__dirname, 'basic', 'example.md'),
    createPath: true,
    header,
    footer,
    prepend
  })

  // Multi
  await generateMarkdownFileSystem({
    input,
    output: path.resolve(__dirname, 'multi'),
    createPath: true,
    multi: true,
    header,
    footer,
    prepend
  })
}

setup()
