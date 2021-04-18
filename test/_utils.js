// @ts-check

const fs = require('fs-extra')
const path = require('path')

const r = path.resolve

const TEMPLATES_DIR = r(__dirname, '..', 'templates')
const APIDOC_DATA_DIR = r(__dirname, '_apidoc', 'out')
const TEST_FILES_DIR = r(__dirname, '_testFiles')
const OUTPUT_EXPECTED_DIR = r(__dirname, 'output-expected')
const OUTPUT_DIR = r(__dirname, 'output')

const getFile = f => fs.promises.readFile(f, 'utf-8')
const areSameFile = async (t, f1, f2) => t.is(await getFile(f1), await getFile(f2))

const beforeTestsHook = async t => {
  await fs.remove(OUTPUT_DIR)
  await new Promise(res => setTimeout(res, 1000))

  const dirs = ['.', 'default', 'bitbucket', 'raw-template', 'multi', 'inject-files', 'inject-files-multi']
  await Promise.all(dirs.map(x => fs.promises.mkdir(r(OUTPUT_DIR, x), { recursive: true })))

  t.context.apidocData = {
    apiDocProjectData: await fs.readJSON(r(APIDOC_DATA_DIR, 'api_project.json')),
    apiDocApiData: await fs.readJSON(r(APIDOC_DATA_DIR, 'api_data.json'))
  }
}

module.exports = {
  TEMPLATES_DIR,
  APIDOC_DATA_DIR,
  TEST_FILES_DIR,
  OUTPUT_EXPECTED_DIR,
  OUTPUT_DIR,
  getFile,
  areSameFile,
  beforeTestsHook
}
