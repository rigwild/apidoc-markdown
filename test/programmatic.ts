import test from 'ava'
import path from 'path'

import { generateMarkdownFile } from '../src'

const r = path.resolve
const examplesDir = r(__dirname, '..', 'examples')
const template = r(__dirname, '..', 'templates', 'default.md')

test('`basic` example generation should not fail', async t =>
  t.notThrowsAsync(generateMarkdownFile({
    apiDocPath: r(examplesDir, 'basic'),
    output: r(examplesDir, 'basic', 'example.md'),
    template: template,
    prepend: null,
    multi: false,
    createPath: false
  })))

test('`ordered` example generation should not fail', async t =>
  t.notThrowsAsync(generateMarkdownFile({
    apiDocPath: r(examplesDir, 'ordered'),
    output: r(examplesDir, 'ordered', 'example.md'),
    template: template,
    prepend: null,
    multi: false,
    createPath: false
  })))

test('`multi` example generation should not fail', async t =>
  t.notThrowsAsync(generateMarkdownFile({
    apiDocPath: r(examplesDir, 'multi'),
    output: r(examplesDir, 'multi', 'output'),
    template: template,
    prepend: null,
    multi: true,
    createPath: true
  })))
