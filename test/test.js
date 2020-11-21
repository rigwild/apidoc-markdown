// @ts-check
const test = require('ava')
const fs = require('fs')
const path = require('path')
const { generateMarkdownFileSystem } = require('../dist')

const TEMPLATES_DIR = path.resolve(__dirname, '..', 'templates')
const APIDOC_DATA_DIR = path.resolve(__dirname, '_apiDocData', 'out')
const TEST_FILES_DIR = path.resolve(__dirname, '_testFiles')
const OUTPUT_EXPECTED_DIR = path.resolve(__dirname, 'output-expected')
const OUTPUT_DIR = path.resolve(__dirname, 'output')

const getFile = f => fs.promises.readFile(f, 'utf-8')

test.before(async () => {
  await fs.promises.rm(OUTPUT_DIR, { recursive: true }).catch(() => {})
  const dirs = [OUTPUT_DIR, path.resolve(OUTPUT_DIR, 'basic'), path.resolve(OUTPUT_DIR, 'multi')]
  await Promise.all(dirs.map(x => fs.promises.mkdir(x)))
})

test('The default template should be present', t => t.true(fs.existsSync(path.resolve(TEMPLATES_DIR, 'default.md'))))

test('`basic` example generation using file system generator', async t => {
  const res = await generateMarkdownFileSystem({
    apiDocPath: APIDOC_DATA_DIR,
    output: path.resolve(OUTPUT_DIR, 'basic', 'example.md'),
    prepend: path.resolve(TEST_FILES_DIR, 'prepended.md')
  })
  t.is(await getFile(res[0].outputFile), await getFile(path.resolve(OUTPUT_EXPECTED_DIR, 'basic', 'example.md')))
})

test('`multi` example generation using file system generator', async t => {
  const res = await generateMarkdownFileSystem({
    apiDocPath: APIDOC_DATA_DIR,
    output: path.resolve(OUTPUT_DIR, 'multi'),
    multi: true,
    createPath: true
  })
  for (let x of res)
    t.is(
      await getFile(x.outputFile),
      await getFile(path.resolve(OUTPUT_EXPECTED_DIR, 'multi', path.basename(x.outputFile)))
    )
})
