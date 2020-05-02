import test from 'ava'
import fs from 'fs'
import { resolve as r } from 'path'

const exampleDir = r(__dirname, '..', 'example')
const templates = r(__dirname, '..', 'templates')

test.serial('The default template should be present', t => t.true(fs.existsSync(r(templates, 'default.md'))))

test.serial('Example apiDoc data should be present and valid json', t => {
  const files = ['api_data.json', 'api_project.json']
  t.plan(files.length * 2)
  files.forEach(file => {
    const filePath = r(exampleDir, '_apiDocData', 'out', file)
    t.true(fs.existsSync(filePath))
    t.notThrows(() => require(filePath))
  })
})

const runGenerator = async (selected: string) => (await import(r(exampleDir, selected, 'generate.ts'))).default()
test.serial('`basic` example generation should not fail', async t => await t.notThrowsAsync(runGenerator('basic')))
test.serial('`multi` example generation should not fail', async t => await t.notThrowsAsync(runGenerator('multi')))

test.serial('`example.md` should be present in example/basic', async t =>
  t.true(fs.existsSync(r(exampleDir, 'basic', 'example.md')))
)

test.serial('Documentation files should be present in example/multi/output', async t => {
  const files = [
    'Define.md',
    'Deprecated.md',
    'Escape.md',
    'Example.md',
    'Group.md',
    'Grouping.md',
    'Header.md',
    'Language.md',
    'Markdown.md',
    'Param.md',
    'Permission.md',
    'indent.md'
  ]
  t.plan(files.length)
  files.forEach(file => t.true(fs.existsSync(r(exampleDir, 'multi', 'output', file))))
})
