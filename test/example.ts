import test from 'ava'
import fs from 'fs'
import path from 'path'

const r = path.resolve
const examples = r(__dirname, '..', 'examples')

test('`api_data.json` and `api_project.json` should be present in each examples and be valid json', t => {
  const files = ['api_data.json', 'api_project.json']
  const examplesTypes = ['basic', 'multi', 'ordered']
  t.plan(files.length * examplesTypes.length * 2)
  files.forEach(file => {
    examplesTypes.forEach(type => {
      const path = r(examples, type, file)
      t.true(fs.existsSync(path))
      t.notThrows(() => require(path))
    })
  })
})

test('`example.md` should be present in /examples/basic', async t =>
  t.true(fs.existsSync(r(examples, 'basic', 'example.md'))))

test('`example.md` should be present in /examples/ordered', async t =>
  t.true(fs.existsSync(r(examples, 'ordered', 'example.md'))))

test('`Post.md` and `User.md` should be present in /examples/multi/output', async t => {
  t.true(fs.existsSync(r(examples, 'multi', 'output', 'Post.md')))
  t.true(fs.existsSync(r(examples, 'multi', 'output', 'User.md')))
})
