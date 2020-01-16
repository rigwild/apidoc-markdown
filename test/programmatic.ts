import test from 'ava'
import path from 'path'

const r = path.resolve
const examplesDir = r(__dirname, '..', 'examples')

const getDocGenerator = async (example: string) => (await import(r(examplesDir, example, 'generate'))).default

test('`basic` example generation should not fail', async t =>
  t.notThrowsAsync(await getDocGenerator('basic')))

test('`ordered` example generation should not fail', async t =>
  t.notThrowsAsync(await getDocGenerator('ordered')))

test('`multi` example generation should not fail', async t =>
  t.notThrowsAsync(await getDocGenerator('multi')))
