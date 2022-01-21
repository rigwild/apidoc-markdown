// @ts-check

/** @type {import('ava').TestInterface} */
// @ts-ignore
const test = require('ava')
const path = require('path')
const { createDocOrThrow } = require('../dist/utils')

const {
  beforeTestsHook,
  TEMPLATES_DIR,
  INPUT_SOURCES_DIR,
  TEST_FILES_DIR,
  OUTPUT_EXPECTED_DIR,
  getFile
} = require('./_utils')
const { generateMarkdown } = require('../dist')

const r = path.resolve

test.before(beforeTestsHook)

test.before(t => {
  t.context.apidocData = createDocOrThrow({ input: INPUT_SOURCES_DIR })
})

test('basic generation', async t => {
  const res = await generateMarkdown({
    apiDocApiData: t.context.apidocData.apiDocApiData,
    apiDocProjectData: t.context.apidocData.apiDocProjectData
  })
  t.is(res[0].name, 'main')
  t.is(res[0].content, await getFile(r(OUTPUT_EXPECTED_DIR, 'default', 'example.md')))
})

test('add files to inject', async t => {
  const res = await generateMarkdown({
    apiDocApiData: t.context.apidocData.apiDocApiData,
    apiDocProjectData: t.context.apidocData.apiDocProjectData,
    header: await getFile(r(TEST_FILES_DIR, 'header.md')),
    footer: await getFile(r(TEST_FILES_DIR, 'footer.md')),
    prepend: await getFile(r(TEST_FILES_DIR, 'prepend.md'))
  })
  t.is(res[0].name, 'main')
  t.is(res[0].content, await getFile(r(OUTPUT_EXPECTED_DIR, 'inject-files', 'example.md')))
})

test('use a template by its name', async t => {
  const res = await generateMarkdown({
    apiDocApiData: t.context.apidocData.apiDocApiData,
    apiDocProjectData: t.context.apidocData.apiDocProjectData,
    template: 'bitbucket'
  })
  t.is(res[0].name, 'main')
  t.is(res[0].content, await getFile(r(OUTPUT_EXPECTED_DIR, 'bitbucket', 'example.md')))
})

test('use a template by passing its path', async t => {
  const res = await generateMarkdown({
    apiDocApiData: t.context.apidocData.apiDocApiData,
    apiDocProjectData: t.context.apidocData.apiDocProjectData,
    template: await getFile(r(TEMPLATES_DIR, 'bitbucket.md'))
  })
  t.is(res[0].name, 'main')
  t.is(res[0].content, await getFile(r(OUTPUT_EXPECTED_DIR, 'bitbucket', 'example.md')))
})

test('use a template by passing its raw plain text content', async t => {
  const res = await generateMarkdown({
    apiDocApiData: t.context.apidocData.apiDocApiData,
    apiDocProjectData: t.context.apidocData.apiDocProjectData,
    template: 'my EJS template <%= project.name %> v<%= project.version %>'
  })
  t.is(res[0].name, 'main')
  t.is(res[0].content, await getFile(r(OUTPUT_EXPECTED_DIR, 'raw-template', 'example.md')))
})

test('multi generation', async t => {
  const res = await generateMarkdown({
    apiDocApiData: t.context.apidocData.apiDocApiData,
    apiDocProjectData: t.context.apidocData.apiDocProjectData,
    multi: true
  })
  const outputExpectedDir = r(OUTPUT_EXPECTED_DIR, 'multi')
  await Promise.all(res.map(async doc => t.is(doc.content, await getFile(r(outputExpectedDir, `${doc.name}.md`)))))
})

test('multi generation with injected files', async t => {
  const res = await generateMarkdown({
    apiDocApiData: t.context.apidocData.apiDocApiData,
    apiDocProjectData: t.context.apidocData.apiDocProjectData,
    header: await getFile(r(TEST_FILES_DIR, 'header.md')),
    footer: await getFile(r(TEST_FILES_DIR, 'footer.md')),
    prepend: await getFile(r(TEST_FILES_DIR, 'prepend.md')),
    multi: true
  })
  const outputExpectedDir = r(OUTPUT_EXPECTED_DIR, 'inject-files-multi')
  await Promise.all(res.map(async doc => t.is(doc.content, await getFile(r(outputExpectedDir, `${doc.name}.md`)))))
})
