import path from 'path'
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
    type: 'string',
    default: './src'
  })
  .option('output', {
    alias: 'o',
    demandOption: true,
    describe: 'Output file or directory to write output to.',
    type: 'string',
    default: 'doc/'
  })
  .option('template', {
    alias: 't',
    describe: 'Name of the template to be used (`default`, `bitbucket`) or path to an EJS template file.',
    type: 'string',
    default: 'default'
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
    type: 'boolean',
    default: false
  })
  .option('createPath', {
    describe: 'Recursively create directory arborescence to the `output` directory.',
    type: 'boolean',
    default: false
  })

  //
  // Other apiDoc options
  //

  .option('config', {
    alias: 'c',
    describe: 'Path to config file (json or javascript)',
    type: 'string',
    default: ''
  })
  .option('no-color', {
    describe: 'Turn off log color',
    type: 'boolean',
    default: false
  })
  .option('debug', {
    alias: 'd',
    describe: 'Show debug messages',
    type: 'boolean',
    default: false
  })
  .option('definitions', {
    describe: 'Include definitions file rather than copying definitions',
    type: 'boolean',
    default: false
  })
  .option('encoding', {
    describe: 'Set the encoding of the source code. [utf8]',
    type: 'string',
    default: 'utf8'
  })
  .option('exclude-filters', {
    alias: 'e',
    describe: 'RegEx-Filter to select files / dirs that should not be parsed (many -e can be used)',
    type: 'array',
    default: [] as string[]
  })
  .option('file-filters', {
    alias: 'f',
    describe: 'RegEx-Filter to select files that should be parsed (multiple -f can be used)',
    type: 'array',
    default: [] as string[]
  })
  .option('filter-by', {
    describe: 'Filter documentation by tag',
    type: 'string',
    default: ''
  })
  .option('log-format', {
    describe: 'Change log format. Allowed values: simple, json',
    type: 'string',
    default: 'simple'
  })
  .option('parse-filters', {
    describe: 'Optional user defined filters. Format name=filename',
    type: 'array',
    default: [] as string[]
  })
  .option('parse-languages', {
    describe: 'Optional user defined languages. Format name=filename',
    type: 'array',
    default: [] as string[]
  })
  .option('parse-parsers', {
    describe: 'Optional user defined parsers. Format name=filename',
    type: 'array',
    default: [] as string[]
  })
  .option('parse-workers', {
    describe: 'Optional user defined workers. Format name=filename',
    type: 'array',
    default: [] as string[]
  })
  .option('private', {
    alias: 'p',
    describe: 'Include private APIs in output',
    type: 'boolean',
    default: false
  })
  .option('quiet', {
    alias: 'q',
    describe: 'Turn all output off',
    type: 'boolean',
    default: false
  })
  .option('verbose', {
    alias: 'v',
    describe: 'Verbose output',
    type: 'boolean',
    default: false
  })
  .option('warn-error', {
    describe: 'Treat warnings as error and exit with error code',
    type: 'boolean',
    default: false
  })
  .option('watch', {
    alias: 'w',
    describe: 'Watch input files for changes to rebuild the docs',
    type: 'boolean',
    default: false
  })

  .help('h')
  .alias('h', 'help')
  .epilog('apidoc-markdown - https://github.com/rigwild/apidoc-markdown')
  .wrap(yargs.terminalWidth())

/**
 * Transform parameters to object
 * @see https://github.com/apidoc/apidoc/blob/dev/bin/apidoc#L24-L43
 */
const transformToObject = (filters: string | string[]): object | undefined => {
  if (!filters) return

  if (typeof filters === 'string') filters = [filters]

  const result = {}
  filters.forEach(filter => {
    const splits = filter.split('=')
    if (splits.length === 2) {
      // @ts-ignore
      result[splits[0]] = path.resolve(splits[1], '')
    }
  })

  return result
}

if (!(cli.argv instanceof Promise)) {
  cli.argv.excludeFilters = ['apidoc.config.js', 'node_modules'].concat(
    cli.argv.excludeFilters.length ? cli.argv.excludeFilters : []
  )
  cli.argv.includeFilters = cli.argv.fileFilters.length
    ? cli.argv.fileFilters
    : '.*\\.(clj|cls|coffee|cpp|cs|dart|erl|exs?|go|groovy|ino?|java|js|jsx|kt|litcoffee|lua|mjs|p|php?|pl|pm|py|rb|scala|ts|vue)$'

  cli.argv.colorize = !cli.argv.noColor

  cli.argv.filters = transformToObject(cli.argv.parseFilters)
  cli.argv.languages = transformToObject(cli.argv.parseLanguages)
  cli.argv.parsers = transformToObject(cli.argv.parseParsers)
  cli.argv.workers = transformToObject(cli.argv.parseWorkers)

  cli.argv.silent = cli.argv.quiet
  cli.argv.apiprivate = cli.argv.private
  cli.argv.copyDefinitions = !cli.argv.definitions

  if (cli.argv.debug) {
    console.debug('[debug] Parsed options:\n')
    console.debug(cli.argv)
  }
}

export default <ConfigurationObjectCLI>cli.argv
