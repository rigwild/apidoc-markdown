// @ts-check

/** @type {import('ava').TestInterface} */
// @ts-ignore
const test = require('ava')
const path = require('path')

const { beforeTestsHook, TEMPLATES_DIR, TEST_FILES_DIR, OUTPUT_EXPECTED_DIR, getFile } = require('./_utils')
const { generateMarkdown } = require('../dist')

const r = path.resolve

test.before(beforeTestsHook)

test('basic generation', async t => {
  const res = await generateMarkdown({
    ...t.context.apidocData
  })
  t.is(res[0].name, 'main')
  t.is(res[0].content, await getFile(r(OUTPUT_EXPECTED_DIR, 'default', 'example.md')))
})

test('add prepend text', async t => {
  const res = await generateMarkdown({
    ...t.context.apidocData,
    prepend: await getFile(r(TEST_FILES_DIR, 'prepended.md'))
  })
  t.is(res[0].name, 'main')
  t.is(res[0].content, await getFile(r(OUTPUT_EXPECTED_DIR, 'prepend', 'example.md')))
})

test('use a template by its name', async t => {
  const res = await generateMarkdown({
    ...t.context.apidocData,
    template: 'bitbucket'
  })
  t.is(res[0].name, 'main')
  t.is(res[0].content, await getFile(r(OUTPUT_EXPECTED_DIR, 'bitbucket', 'example.md')))
})

test('use a template by passing its path', async t => {
  const res = await generateMarkdown({
    ...t.context.apidocData,
    template: await getFile(r(TEMPLATES_DIR, 'bitbucket.md'))
  })
  t.is(res[0].name, 'main')
  t.is(res[0].content, await getFile(r(OUTPUT_EXPECTED_DIR, 'bitbucket', 'example.md')))
})

test('use a template by passing its raw plain text content', async t => {
  const res = await generateMarkdown({
    ...t.context.apidocData,
    template: 'my EJS template <%= project.name %> v<%= project.version %>'
  })
  t.is(res[0].name, 'main')
  t.is(res[0].content, await getFile(r(OUTPUT_EXPECTED_DIR, 'raw-template', 'example.md')))
})

test('multi generation', async t => {
  const res = await generateMarkdown({
    ...t.context.apidocData,
    multi: true
  })
  const outputExpectedDir = r(OUTPUT_EXPECTED_DIR, 'multi')
  await Promise.all(res.map(async doc => t.is(doc.content, await getFile(r(outputExpectedDir, `${doc.name}.md`)))))
})

test('multi generation with prepended text', async t => {
  const res = await generateMarkdown({
    ...t.context.apidocData,
    prepend: await getFile(r(TEST_FILES_DIR, 'prepended.md')),
    multi: true
  })
  const outputExpectedDir = r(OUTPUT_EXPECTED_DIR, 'prepend-multi')
  await Promise.all(res.map(async doc => t.is(doc.content, await getFile(r(outputExpectedDir, `${doc.name}.md`)))))
})
