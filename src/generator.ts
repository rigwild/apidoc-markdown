import path from 'path'
import { promises as fs } from 'fs'
import ejs from 'ejs'
import semver from 'semver'

import * as utils from './utils'
import * as utilsTemplate from './utils_template'
import { ConfigurationObj } from './types'

/**
 * Load the apiDoc project
 * Will check some documentation generator parameters
 * @param param0 Generator parameters
 * @throws A parameter is not set or invalid
 */
const loadApiDocProject = async ({
  apiDocPath,
  template,
  prepend
}: Pick<ConfigurationObj, 'apiDocPath' | 'template' | 'prepend'>) => {
  // Check the apiDoc data path exists
  if (!apiDocPath) throw new Error('`apiDocPath` is required but was not provided.')
  if (!(await utils.pathExists(apiDocPath))) throw new Error('The `apiDocPath` path does not exist or is not readable.')

  // Check the template file path exists
  if (!template) throw new Error('`template` is required but was not provided.')
  if (!(await utils.pathExists(template))) throw new Error('The `template` path does not exist or is not readable.')

  // Check the prepend file path exists
  if (prepend && !(await utils.pathExists(prepend)))
    throw new Error('The `prepend` path does not exist or is not readable.')

  // Load the apiDoc data
  const { apiData, projectData } = await utils.importApiDocData(apiDocPath)

  // Import documentation template
  const ejsCompiler = ejs.compile((await fs.readFile(template)).toString())
  return { apiData, projectData, ejsCompiler }
}

/**
 * Get the documentation compiler
 * @param param0 Documentation generator parameters
 * @returns The single and multi file compilers, ready for usage
 */
export const getCompiler = async ({
  apiDocPath,
  template,
  prepend
}: Pick<ConfigurationObj, 'apiDocPath' | 'template' | 'prepend'>) => {
  const { apiData, projectData, ejsCompiler } = await loadApiDocProject({ apiDocPath, template, prepend })
  // Define template data
  let apiByGroupAndName: any[]

  // Group apiDoc data by group and name
  apiByGroupAndName = utils
    .unique(Object.values(apiData).map(x => x.group))
    .reduce((acc, cur) => {
      if (apiData.find(x => x.group === cur)) acc.push({ name: cur, subs: [] })
      return acc
    }, [] as {}[])
    .map((g: any) => {
      apiData.forEach(x => x.group === g.name && g.subs.push(x))
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
  if (projectData.order) {
    // Lowercased project order setting array
    const orderLowerCase = projectData.order.map((x: string) => x.toLowerCase())
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
    ...utilsTemplate,

    project: projectData,
    prepend: prepend ? (await fs.readFile(prepend)).toString() : null
  }

  return {
    singleCompiler: () => [{ name: 'main', content: ejsCompiler({ ...templateConfig, data: apiByGroupAndName }) }],
    multiCompiler: () =>
      apiByGroupAndName.map(x => ({
        name: x.name,
        content: ejsCompiler({ ...templateConfig, data: [x] })
      }))
  }
}

/**
 * Generate mardown documentation. If single file, key `name` will be `main`
 * @param param0 Generator configuration
 * @returns Generated documentation
 */
export const generateMarkdown = async ({
  apiDocPath,
  template,
  prepend,
  multi
}: Omit<ConfigurationObj, 'output' | 'createPath'>) => {
  const compilers = await getCompiler({ apiDocPath, template, prepend })
  return !multi ? compilers.singleCompiler() : compilers.multiCompiler()
}

/**
 * Generate mardown documentation and create output files
 * @param param0 Generator configuration
 * @returns Generated documentation data
 */
export const generateMarkdownFile = async ({
  apiDocPath,
  output,
  template,
  prepend,
  multi,
  createPath
}: ConfigurationObj) => {
  // Recursively create directory arborescence if cli option is true
  if (createPath) await utils.mkdirp(output)

  // Check the output path exists (only parent directory if unique file)
  if (!output) throw new Error('`output` is required but was not provided.')
  const outputPath = multi ? output : path.parse(path.resolve('.', output)).dir
  if (!(await utils.pathExists(outputPath))) throw new Error('The `output` path does not exist or is not readable.')

  const docs = await generateMarkdown({ apiDocPath, template, prepend, multi })
  if (!multi) {
    // Single file documentation generation
    const singleDoc = docs[0].content
    return fs.writeFile(output, singleDoc).then(() => ({ outputFile: output, content: singleDoc }))
  } else {
    // Multi file documentation generation
    return Promise.all(
      docs.map(aDoc => {
        const filePath = path.resolve(outputPath, `${aDoc.name}.md`)
        return fs.writeFile(filePath, aDoc.content).then(() => ({ outputFile: filePath, content: aDoc.content }))
      })
    )
  }
}
