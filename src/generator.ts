import path from 'path'
import { promises as fs } from 'fs'
import ejs from 'ejs'
import semver from 'semver'

import * as utils from './utils'
import { ConfigurationObject, ConfigurationObjectCLI } from './types'

const defaultTemplatePath = path.resolve(__dirname, '..', 'default.md')

/**
 * Get the documentation generator
 *
 * @param param0 Documentation generator parameters
 * @returns The single and multi file compilers, ready for usage
 */
export const generate = ({
  apiDocProjectData,
  apiDocApiData,
  prepend,
  multi,
  ejsCompiler
}: Omit<ConfigurationObject, 'template'> & { ejsCompiler: ejs.TemplateFunction }) => {
  // const { apiData, projectData, ejsCompiler } = await loadApiDocProject({ apiDocPath, template, prepend })
  // Define template data
  let apiByGroupAndName: any[]

  // Group apiDoc data by group and name
  apiByGroupAndName = utils
    .unique(Object.values(apiDocApiData).map(x => x.group))
    .reduce((acc, cur) => {
      if (apiDocApiData.find(x => x.group === cur)) acc.push({ name: cur, subs: [] })
      return acc
    }, [] as {}[])
    .map((g: any) => {
      apiDocApiData.forEach(x => x.group === g.name && g.subs.push(x))
      return g
    })
    .map((g: any) => {
      g.subs = Object.values(
        g.subs.reduce((acc: any, cur: any) => {
          if (!acc[cur.title] || semver.gt(cur.version, acc[cur.title].version)) acc[cur.title] = cur
          return acc
        }, {})
      )
      return g
    })

  // Order using the project order setting
  if (apiDocProjectData.order) {
    // Lowercased project order setting array
    const orderLowerCase = apiDocProjectData.order.map((x: string) => x.toLowerCase())
    // Find items not in the project order setting array
    const notInOrderArr = apiByGroupAndName.filter(x => orderLowerCase.indexOf(x.name.toLowerCase()) === -1)
    // Sorted, with the ones not in the project order setting array appended to it
    apiByGroupAndName = [
      ...apiByGroupAndName.sort((a, b) =>
        orderLowerCase.indexOf(a.name.toLowerCase()) >= orderLowerCase.indexOf(b.name.toLowerCase()) ? 1 : -1
      ),
      ...notInOrderArr
    ]
  }

  // This is the config passed to the template
  const templateConfig = {
    // Every functions in `utils_template.js` are passed to the EJS compiler
    ...utils.templateUtils,

    project: apiDocProjectData,
    prepend
  }

  return !multi
    ? [{ name: 'main', content: ejsCompiler({ ...templateConfig, data: apiByGroupAndName }) }]
    : apiByGroupAndName.map(x => ({
        name: x.name,
        content: ejsCompiler({ ...templateConfig, data: [x] })
      }))
}

/**
 * Generate mardown documentation.
 *
 * @param param0 Generator configuration
 * @returns Generated documentation
 */
export const generateMarkdown = async ({
  apiDocProjectData,
  apiDocApiData,
  template,
  prepend,
  multi
}: ConfigurationObject) => {
  // Create the EJS compiler. Load the default documentation template if not provided
  const ejsCompiler = ejs.compile(template ? template : await fs.readFile(defaultTemplatePath, 'utf-8'))

  // Generate the actual documentation
  return generate({ apiDocProjectData, apiDocApiData, prepend, multi, ejsCompiler })
}

/**
 * Generate mardown documentation and create output file(s).
 *
 * @param param0 Generator configuration
 * @returns Generated documentation
 * @throws Some CLI command parameters are missing or invalid
 */
export const generateMarkdownFileSystem = async ({
  apiDocPath,
  output,
  template,
  prepend,
  multi,
  createPath
}: ConfigurationObjectCLI) => {
  // Check the apiDoc data path exists
  if (!apiDocPath) throw new Error('`apiDocPath` is required but was not provided.')
  if (!(await utils.pathExists(apiDocPath))) throw new Error('The `apiDocPath` path does not exist or is not readable.')

  // Check the template file path exists, take default if template if not provided
  if (!template) template = defaultTemplatePath
  if (!(await utils.pathExists(template))) throw new Error('The `template` path does not exist or is not readable.')

  // Check the prepend file path exists
  if (prepend && !(await utils.pathExists(prepend)))
    throw new Error('The `prepend` path does not exist or is not readable.')

  // Check the output path exists (only parent directory if unique file)
  if (!output) throw new Error('`output` is required but was not provided.')
  // Recursively create directory arborescence if cli option is true
  if (createPath) await utils.mkdirp(output)
  const outputPath = multi ? output : path.parse(path.resolve('.', output)).dir
  if (!(await utils.pathExists(outputPath))) throw new Error('The `output` path does not exist or is not readable.')

  // Load the apiDoc data, be backward-compatible with legacy `apidoc.json`
  const apiDocProjectData = await import(path.resolve(apiDocPath, 'api_project.json'))
    .catch(() => import(path.resolve(apiDocPath, 'apidoc.json')))
    .catch(err => {
      err.message = 'Could not load `api_project.json` or `apidoc.json` - ' + err.message
      throw err
    })
  const apiDocApiData = Object.values<any>(await import(path.resolve(apiDocPath, 'api_data.json'))).filter(x => x.type)

  // Import documentation template
  const ejsCompiler = ejs.compile(await fs.readFile(template, 'utf-8'))

  // Generate the actual documentation
  const documentation = generate({ apiDocProjectData, apiDocApiData, prepend, multi, ejsCompiler })

  // Create the output files
  if (!multi) {
    // Single file documentation generation
    const singleDoc = documentation[0].content
    return fs.writeFile(output, singleDoc).then(() => [{ outputFile: output, content: singleDoc }])
  } else {
    // Multi file documentation generation
    return Promise.all(
      documentation.map(aDoc => {
        const filePath = path.resolve(outputPath, `${aDoc.name}.md`)
        return fs.writeFile(filePath, aDoc.content).then(() => ({ outputFile: filePath, content: aDoc.content }))
      })
    )
  }
}
