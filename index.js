#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const argv = require('./cli')
const utils = require('./utils')

// Recursively create directory arborescence if cli option is true
if (argv.createPath) fs.mkdirSync(argv.output, { recursive: true })

// Check output path exists
try {
  fs.accessSync(argv.output)
} catch (err) {
  throw new Error('Could not access the output path. Check it exists and have read permission on it.')
}

// Load the apiDoc data
const apiData = require(path.resolve(argv.path, 'api_data.json')).filter(x => x.type)
// Load the apiDoc project data
const projData = require(path.resolve(argv.path, 'api_project.json'))
// Import documentation template
const template = ejs.compile(fs.readFileSync(argv.template).toString())

// Groupe apiDoc data by group
const apiByGroup = utils.groupBy(apiData, entry => entry.group)
// Groupe apiDoc data by group and name
const apiByGroupAndName = Object.keys(apiByGroup).reduce((acc, x) => {
  acc[x] = utils.groupBy(apiByGroup[x], entry => entry.name)
  return acc
}, {})

// This is the config passed to the template
const config = {
  project: projData,
  prepend: argv.prepend ? fs.readFileSync(argv.prepend).toString() : null,
  ...utils
}

// Create a documentation file
const doc = (path, config) => fs.writeFileSync(path, template(config))

if (!argv.multi) {
  // Output the documentation to a single file
  doc(argv.output, { ...config, data: apiByGroupAndName })
  console.log(`Documentation was generated to the "${argv.output}" file.`)
}
else {
  // Output the documentation to one file per group
  Object.keys(apiByGroupAndName).forEach(groupKey =>
    doc(path.resolve(argv.output, `${groupKey}.md`), { ...config, data: { [groupKey]: apiByGroupAndName[groupKey] } }))
  console.log(`Documentation was generated, one file per group, to the "${argv.output}" directory.`)
}
