// @ts-check

/** @type {import('ava').TestInterface} */
// @ts-ignore
const test = require('ava')
const path = require('path')

const { generateMarkdownFileSystem, availableTemplates } = require('../dist')
const {
  beforeTestsHook,
  TEMPLATES_DIR,
  APIDOC_DATA_DIR,
  TEST_FILES_DIR,
  OUTPUT_EXPECTED_DIR,
  OUTPUT_DIR,
  areSameFile
} = require('./_utils')

const r = path.resolve

test.before(beforeTestsHook)

test('can recursively create the path', async t => {
  const res = await generateMarkdownFileSystem({
    apiDocPath: APIDOC_DATA_DIR,
    output: r(OUTPUT_DIR, 'createpath', 'sub', 'directory', 'example.md'),
    createPath: true
  })
  await areSameFile(t, res[0].outputFile, r(OUTPUT_EXPECTED_DIR, 'createpath', 'sub', 'directory', 'example.md'))
})

test('use a template by its name', async t => {
  const res = await generateMarkdownFileSystem({
    apiDocPath: APIDOC_DATA_DIR,
    output: r(OUTPUT_DIR, 'bitbucket', 'example.md'),
    template: availableTemplates.bitbucket
  })
  await areSameFile(t, res[0].outputFile, r(OUTPUT_EXPECTED_DIR, 'bitbucket', 'example.md'))
})

test('use a template by passing its path', async t => {
  const res = await generateMarkdownFileSystem({
    apiDocPath: APIDOC_DATA_DIR,
    output: r(OUTPUT_DIR, 'bitbucket', 'example.md'),
    template: r(TEMPLATES_DIR, 'bitbucket.md')
  })
  await areSameFile(t, res[0].outputFile, r(OUTPUT_EXPECTED_DIR, 'bitbucket', 'example.md'))
})

test('use a template by passing its raw plain text content', async t => {
  const res = await generateMarkdownFileSystem({
    apiDocPath: APIDOC_DATA_DIR,
    output: r(OUTPUT_DIR, 'raw-template', 'example.md'),
    template: 'my EJS template <%= project.name %> v<%= project.version %>'
  })
  await areSameFile(t, res[0].outputFile, r(OUTPUT_EXPECTED_DIR, 'raw-template', 'example.md'))
})

test('multi generation', async t => {
  const res = await generateMarkdownFileSystem({
    apiDocPath: APIDOC_DATA_DIR,
    output: r(OUTPUT_DIR, 'multi'),
    multi: true
  })
  const outputExpectedDir = r(OUTPUT_EXPECTED_DIR, 'multi')
  for (let doc of res) await areSameFile(t, doc.outputFile, r(outputExpectedDir, path.basename(doc.outputFile)))
})

test('add a file to prepend', async t => {
  const res = await generateMarkdownFileSystem({
    apiDocPath: APIDOC_DATA_DIR,
    output: r(OUTPUT_DIR, 'prepend', 'example.md'),
    prepend: r(TEST_FILES_DIR, 'prepended.md')
  })
  await Promise.all(res.map(() => areSameFile(t, res[0].outputFile, r(OUTPUT_EXPECTED_DIR, 'prepend', 'example.md'))))
})

test('multi generation with prepended file', async t => {
  const res = await generateMarkdownFileSystem({
    apiDocPath: APIDOC_DATA_DIR,
    output: r(OUTPUT_DIR, 'prepend-multi'),
    multi: true,
    prepend: r(TEST_FILES_DIR, 'prepended.md')
  })
  const outputExpectedDir = r(OUTPUT_EXPECTED_DIR, 'prepend-multi')
  await Promise.all(res.map(doc => areSameFile(t, doc.outputFile, r(outputExpectedDir, path.basename(doc.outputFile)))))
})
