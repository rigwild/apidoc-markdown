import test from 'ava'
import fs from 'fs'
import path from 'path'

const r = path.resolve
const examples = r(__dirname, '..', 'examples')

test('Example apiDoc data should be present and valid js/json', t => {
  const files = ['api_project.json', 'api_data.json', '_apidoc.js']
  t.plan(files.length * 2)
  files.forEach(file => {
    const path = r(examples, '_apiDocData', file)
    t.true(fs.existsSync(path))
    t.notThrows(() => require(path))
  })
})

test('`example.md` should be present in /examples/basic', async t =>
  t.true(fs.existsSync(r(examples, 'basic', 'example.md'))))

test('`example.md` should be present in /examples/ordered', async t =>
  t.true(fs.existsSync(r(examples, 'ordered', 'example.md'))))

test('`Message.md` and `User.md` should be present in /examples/multi/output', async t => {
  t.true(fs.existsSync(r(examples, 'multi', 'output', 'Message.md')))
  t.true(fs.existsSync(r(examples, 'multi', 'output', 'User.md')))
})
