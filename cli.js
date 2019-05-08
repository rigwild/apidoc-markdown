'use strict'

const path = require('path')
const yargs = require('yargs')

/**
 * @typedef {Object} CliObject
 * @property {String} path Path to generated apiDoc output directory. Where `api_data.json` and `api_project.json` resides
 * @property {String} output Output file or directory to write output to
 * @property {String} [template='./templates/default.md'] Path to EJS template file
 * @property {String} prepend Path to file content to add before route groups documentation
 * @property {Boolean} multi Output one file per group to the `output` directory
 * @property {Boolean} createPath Recursively create directory arborescence to the `output` directory
 * @property {String} $0 The script name or node command
 */
/**
 * @constant
 * @type {CliObject}
 */
const cli = yargs
  .usage('Generate Markdown documentation from apiDoc data.')
  .usage('Usage: apidoc-markdown -p <path> -o <output_file> [-t <template_path>] [--multi] [--createPath] [--prepend <file_path>]')
  .example('apidoc-markdown -p doc/ -o doc.md', 'Generate from `doc/` apiDoc output to `./doc.md`')
  .example('apidoc-markdown -p doc -o multi-arg --multi --createPath', 'Generate from `doc/` apiDoc output to `./multi-arg/<group>.md`')
  .option('path', {
    alias: 'p',
    demandOption: true,
    describe: 'Path to generated apiDoc output directory. Where `api_data.json` and `api_project.json` resides.',
    type: 'string'
  })
  .option('output', {
    alias: 'o',
    demandOption: true,
    describe: 'Output file or directory to write output to.',
    type: 'string'
  })
  .option('template', {
    alias: 't',
    describe: 'Path to EJS template file, if not specified default template will be used.',
    default: path.resolve(__dirname, 'templates', 'default.md'),
    type: 'string'
  })
  .option('prepend', {
    describe: 'Path to file content to add before route groups documentation.',
    type: 'string'
  })
  .option('multi', {
    describe: 'Output one file per group to the `output` directory.',
    default: false,
    type: 'boolean'
  })
  .option('createPath', {
    describe: 'Recursively create directory arborescence to the `output` directory.',
    default: false,
    type: 'boolean'
  })
  .help('h')
  .alias('h', 'help')
  .epilog('@rigwild/apidoc-markdown - https://github.com/rigwild/apidoc-markdown').argv
  .wrap(yargs.terminalWidth())

module.exports = cli
