import path from 'path'
import yargs from 'yargs'
import { ConfigurationObj } from './types'

const cli = yargs
  .usage('Generate Markdown documentation from apiDoc data.')
  .usage(
    'Usage: apidoc-markdown -p <path> -o <output_file> [-t <template_path>] [--multi] [--createPath] [--prepend <file_path>]'
  )
  .example('apidoc-markdown -p doc/ -o doc.md', 'Generate from `doc/` apiDoc output to `./doc.md`')
  .example(
    'apidoc-markdown -p doc -o multi --multi --createPath',
    'Generate from `doc/` apiDoc output to `./multi/<group>.md`'
  )
  .option('apiDocPath', {
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
    default: path.resolve(__dirname, '..', 'templates', 'default.md'),
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
  .epilog('@rigwild/apidoc-markdown - https://github.com/rigwild/apidoc-markdown')
  .wrap(yargs.terminalWidth())

export default <ConfigurationObj>cli.argv
