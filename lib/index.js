'use strict'

const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const semver = require('semver')

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
  utils.checkPathExists(multi ? output : path.parse(path.resolve('.', output)).dir)

  // Check the template file path exists
  if (!template) throw new Error('`template` is required but was not provided')
  utils.checkPathExists(template)

  // Check the prepend file path exists
  if (prepend) utils.checkPathExists(prepend)

  // Load the apiDoc data
  const { apiData, projectData } = utils.importApiDocData(apiDocPath)

  // Import documentation template
  const ejsCompiler = ejs.compile(fs.readFileSync(template).toString())

  // Define template data
  let apiByGroupAndName

  if (projectData.order) {
    // Group apiDoc data by group, name and with respect of order
    apiByGroupAndName = projectData.order
      .reduce((acc, cur) => {
        if (apiData.find(x => x.group === cur)) acc.push({ name: cur, subs: [] })
        return acc
      }, [])
      .map(g => {
        projectData.order.forEach(x => {
          let groupItem = apiData.find(y => y.group === g.name && y.name === x)
          if (groupItem) g.subs.push(groupItem)
        })
        return g
      })
  }
  else {
    // Group apiDoc data by group and name
    apiByGroupAndName = utils.unique(Object.values(apiData).map(x => x.group))
      .reduce((acc, cur) => {
        if (apiData.find(x => x.group === cur)) acc.push({ name: cur, subs: [] })
        return acc
      }, [])
      .map(g => {
        apiData.forEach(x => x.group === g.name && g.subs.push(x))
        return g
      })
      .map(g => {
        g.subs = Object.values(g.subs.reduce((acc, cur) => {
          if (!acc[cur.title] || semver.gt(cur.version, acc[cur.title].version)) acc[cur.title] = cur
          return acc
        }, {}))
        return g
      })
  }

  // This is the config passed to the template
  const templateConfig = {
    project: projectData,
    prepend: prepend ? fs.readFileSync(prepend).toString() : null,
    ...utilsTemplate
    // Every functions in `utils_template.js` are passed to the EJS compiler
  }

  if (!multi) {
    // Output the documentation to a single file
    utils.createDoc(output, { ...templateConfig, data: apiByGroupAndName }, ejsCompiler)
    console.log(`Documentation was generated to the "${output}" file.`)
  }
  else {
    // Output the documentation to one file per group
    apiByGroupAndName.forEach(x =>
      utils.createDoc(path.resolve(output, `${x.name}.md`), { ...templateConfig, data: [x] }, ejsCompiler))
    console.log(`Documentation was generated, one file per group, to the "${output}" directory.`)
  }
}

module.exports = { setup, ...utils }
