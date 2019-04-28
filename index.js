#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

const argv = require('./cli')
const utils = require('./utils')

const apiData = require(path.resolve(argv.path, 'api_data.json')).filter(x => x.type)
const projData = require(path.resolve(argv.path, 'api_project.json'))
const template = ejs.compile(fs.readFileSync(argv.template).toString())

const apiByGroup = utils.groupBy(apiData, entry => entry.group)
const apiByGroupAndName = Object.keys(apiByGroup).reduce((acc, x) => {
  acc[x] = utils.groupBy(apiByGroup[x], entry => entry.name)
  return acc
}, {})

const data = {
  project: projData,
  data: apiByGroupAndName,
  prepend: argv.prepend ? fs.readFileSync(argv.prepend).toString() : null,
  toLink: utils.toLink
}

fs.writeFileSync(argv.output, template(data))
console.log(`Wrote apidoc-markdown template output to : ${argv.output}`)
