import test from 'ava'
import fs from 'fs'
import path from 'path'

const r = path.resolve
const templates = r(__dirname, '..', 'templates')

test('The default template should be present', t => t.true(fs.existsSync(r(templates, 'default.md'))))
