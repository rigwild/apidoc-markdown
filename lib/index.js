'use strict'

const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

const utils = require('./utils')
const utilsTemplate = require('./utils_template')

const setup = ({ path: apiDocPath, output, template, prepend, multi, createPath }) => {
  // Recursively create directory arborescence if cli option is true
  if (createPath) utils.mkdirp(output)

  // Check the apiDoc data path exists
  if (!apiDocPath) throw new Error('`apiDocPath` is required but was not provided')
  utils.checkPathExists(apiDocPath)

  // Check the output path exists (only parent directory if unique file)
  if (!output) throw new Error('`output` is required but was not provided')
  utils.checkPathExists(multi ? output : path.parse(output).dir)

  // Check the template file path exists
  if (!template) throw new Error('`template` is required but was not provided')
  utils.checkPathExists(template)

  // Check the prepend file path exists
  if (prepend) utils.checkPathExists(prepend)

  // Load the apiDoc data
  const { apiData, projectData } = utils.importApiDocData(apiDocPath)

  // Import documentation template
  const ejsCompiler = ejs.compile(fs.readFileSync(template).toString())

  // Group apiDoc data by group
  const apiByGroup = utils.groupBy(apiData, entry => entry.group)

  // Group apiDoc data by group and name
  const apiByGroupAndName = Object.keys(apiByGroup).reduce((acc, x) => {
    acc[x] = utils.groupBy(apiByGroup[x], entry => entry.name)
    return acc
  }, {})

  // This is the config passed to the template
  const templateConfig = {
    project: projectData,
    prepend: prepend ? fs.readFileSync(prepend).toString() : null,
    ...utilsTemplate // Every functions in `utils_template.js` is passed to the EJS compiler
  }

  if (!multi) {
    // Output the documentation to a single file
    utils.createDoc(output, { ...templateConfig, data: apiByGroupAndName }, ejsCompiler)
    console.log(`Documentation was generated to the "${output}" file.`)
  }
  else {
    // Output the documentation to one file per group
    Object.keys(apiByGroupAndName).forEach(groupKey =>
      utils.createDoc(path.resolve(output, `${groupKey}.md`), { ...templateConfig, data: { [groupKey]: apiByGroupAndName[groupKey] } }, ejsCompiler))
    console.log(`Documentation was generated, one file per group, to the "${output}" directory.`)
  }
}

module.exports = { setup, ...utils }
