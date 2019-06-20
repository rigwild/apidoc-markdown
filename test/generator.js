'use strict'

const fs = require('fs')
const path = require('path')
const assert = require('assert')

const r = path.resolve
const example = r(__dirname, '..', 'examples')

describe('Generator', () => {
  it('`api_data.json` and `api_project.json` should be present in /examples/ and be valid json', () => {
    ['api_data.json', 'api_project.json'].forEach(file => {
      const path = r(example, file)
      assert.ok(fs.existsSync(path))
      require(path)
    })
  })

  it('`example.md` should be present in /examples/', () => {
    assert.ok(fs.existsSync(example))
  })

  it('`Post.md` and `User.md` should be present in /examples/multi-arg/', () => {
    ['Post.md', 'User.md'].forEach(file => {
      assert.ok(fs.existsSync(r(example, 'multi-arg', file)))
    })
  })
})
