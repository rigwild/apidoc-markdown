import test from 'ava'
import fs from 'fs'
import path from 'path'

const example = path.resolve(__dirname, '..', 'example')
const templates = path.resolve(__dirname, '..', 'templates')

test.serial('The default template should be present', t => t.true(fs.existsSync(path.resolve(templates, 'default.md'))))

test.serial('Example apiDoc data should be present and valid json', t => {
  const files = ['api_data.json', 'api_project.json']
  t.plan(files.length * 2)
  files.forEach(file => {
    const filePath = path.resolve(example, '_apiDocData', 'out', file)
    t.true(fs.existsSync(filePath))
    t.notThrows(() => require(filePath))
  })
})

const runGenerator = async (example: string) => (await import(path.resolve(example, example, 'generate'))).default()
test.serial('`basic` example generation should not fail', async t => await t.notThrowsAsync(runGenerator('basic')))
test.serial('`multi` example generation should not fail', async t => await t.notThrowsAsync(runGenerator('multi')))

test.serial('`example.md` should be present in example/basic', async t =>
  t.true(fs.existsSync(path.resolve(example, 'basic', 'example.md')))
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
  files.forEach(file => t.true(fs.existsSync(path.resolve(example, 'multi', 'output', file))))
})
