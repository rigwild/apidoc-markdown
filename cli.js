'use strict'

const path = require('path')
/**
 * @typedef {Object} CliObject
 * @property {string} path Path to generated apiDoc output directory. Where `api_data.json` and `api_project.json` resides
 * @property {string} output Output file to write
 * @property {string} [template='./templates/default.md'] Path to EJS template file
 * @property {string} $0 The script name or node command
 */
/**
 * @constant
 * @type {CliObject}
 */
const cli = require('yargs')
  .usage('Generate Markdown documentation from apiDoc data.')
  .usage('Usage: $0 -p [path] -o [output file]')
  .example('$0 -p doc/ -o doc.md', 'Generate from `doc/` apiDoc output to `./doc.md`')
  .option('path', {
    alias: 'p',
    demandOption: true,
    describe: 'Path to generated apiDoc output directory. Where `api_data.json` and `api_project.json` resides.',
    type: 'string'
  })
  .option('output', {
    alias: 'o',
    demandOption: true,
    describe: 'Output file to write.',
    type: 'string'
  })
  .option('template', {
    alias: 't',
    describe: 'Path to EJS template file, if not specified default template will be used.',
    default: path.resolve(__dirname, 'templates', 'default.md'),
    type: 'string'
  })
  .option('prepend', {
    describe: 'Path to file content to add before route groups documentation.'
  })
  .demandOption(['path', 'output'])
  .help('h')
  .alias('h', 'help')
  .epilog('@rigwild/apidoc-markdown - https://github.com/rigwild/apidoc-markdown').argv

module.exports = cli
