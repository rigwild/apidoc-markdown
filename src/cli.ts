import yargs from 'yargs'
import { ConfigurationObjectCLI } from './types'

const cli = yargs
  .usage('Generate a Simple and Portable Markdown documentation for your API.')
  .usage(
    'Usage: apidoc-markdown -i <path> -o <output_file> [-t <template_name>] [--multi] [--createPath] [--prepend <file_path>]'
  )
  .example('apidoc-markdown -i src -o doc.md', 'Generate from `src` source files to `doc.md`')
  .example('apidoc-markdown --input src --output doc.md', 'Generate from `src` source files to `doc.md`')
  .example(
    'apidoc-markdown -i src -o doc.md -t bitbucket',
    'Generate from `src` source files to `doc.md` using the `bitbucket` template'
  )
  .example(
    'apidoc-markdown -i src -o doc.md -t my_custom_template.md',
    'Generate from `src` source files to `doc.md` using a provided template file'
  )
  .example('apidoc-markdown -i src -o doc --multi', 'Generate from `src` source files to `doc/<group>.md`')
  .option('input', {
    alias: 'i',
    demandOption: true,
    describe: 'Input source files path',
    default: 'src',
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
    describe: 'Name of the template to be used (`default`, `bitbucket`) or path to an EJS template file.',
    default: 'default',
    type: 'string'
  })
  .option('header', {
    describe: 'Path to file content to add at the top of the documentation.',
    type: 'string'
  })
  .option('footer', {
    describe: 'Path to file content to add at the bottom of the documentation.',
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
  .epilog('apidoc-markdown - https://github.com/rigwild/apidoc-markdown')
  .wrap(yargs.terminalWidth())

export default <ConfigurationObjectCLI>cli.argv
