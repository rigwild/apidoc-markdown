import path from 'path'
import { promises as fs } from 'fs'
import ejs from 'ejs'
import semverGt from 'semver/functions/gt'

import { loadTemplate, mkdirp, pathExists, templateUtils, unique } from './utils'
import { ConfigurationObject, ConfigurationObjectCLI } from './types'

/**
 * Get the documentation generator
 *
 * @param param0 Documentation generator parameters
 * @returns The single or multi file EJS compiler, ready for usage
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
  apiByGroupAndName = unique(Object.values(apiDocApiData).map(x => x.group))
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
          if (!acc[cur.title] || semverGt(cur.version, acc[cur.title].version)) acc[cur.title] = cur
          return acc
        }, {})
      )
      return g
    })

  // Sort entries by group name and title ascending
  apiByGroupAndName = apiByGroupAndName.sort((a: any, b: any) => a.name.localeCompare(b.name))
  apiByGroupAndName.forEach(x => x.subs.sort((a: any, b: any) => a.title.localeCompare(b.title)))

  // Order using the project order setting
  if (apiDocProjectData.order) {
    // Lowercased project order setting array
    const orderLowerCase = apiDocProjectData.order.map((x: string) => x.toLowerCase())

    // Filter items in/not in the project order setting array
    const inOrderArr: any[] = []
    const notInOrderArr: any[] = []
    apiByGroupAndName.forEach(x =>
      orderLowerCase.indexOf(x.name.toLowerCase()) === -1 ? notInOrderArr.push(x) : inOrderArr.push(x)
    )

    // Sorted, with the ones not in the project order setting array appended to it
    apiByGroupAndName = [
      ...inOrderArr.sort((a, b) => {
        const aIndex = orderLowerCase.indexOf(a.name.toLowerCase())
        const bIndex = orderLowerCase.indexOf(b.name.toLowerCase())
        if (aIndex === -1 && bIndex === -1) return 0
        return aIndex > bIndex ? 1 : -1
      }),
      ...notInOrderArr
    ]
  }

  // This is the config passed to the template
  const templateConfig = {
    // Every functions in `utils_template.js` are passed to the EJS compiler
    ...templateUtils,

    project: apiDocProjectData,
    prepend
  }

  return !multi
    ? [{ name: 'main', content: ejsCompiler({ ...templateConfig, data: apiByGroupAndName }) }]
    : apiByGroupAndName.map(x => ({
        name: x.name as string,
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
}: ConfigurationObject) =>
  generate({ apiDocProjectData, apiDocApiData, prepend, multi, ejsCompiler: await loadTemplate(template, false) })

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
  if (!(await pathExists(apiDocPath))) throw new Error('The `apiDocPath` path does not exist or is not readable.')

  // Check the prepend file path exists
  if (prepend) {
    if (!(await pathExists(prepend))) throw new Error('The `prepend` path does not exist or is not readable.')

    prepend = (await fs.readFile(prepend as string, { encoding: 'utf-8' })) as string
  }

  // Check the output path exists (only parent directory if unique file)
  if (!output) throw new Error('`output` is required but was not provided.')

  // Recursively create directory arborescence if cli option is true
  if (createPath) await mkdirp(output)

  const outputPath = multi ? output : path.parse(path.resolve('.', output)).dir
  if (!(await pathExists(outputPath))) throw new Error('The `output` path does not exist or is not readable.')

  // Load the apiDoc data, be backward-compatible with legacy `apidoc.json`
  const apiDocProjectData = await import(path.resolve(apiDocPath, 'api_project.json'))
    .catch(() => import(path.resolve(apiDocPath, 'apidoc.json')))
    .catch(err => {
      err.message = 'Could not load `api_project.json` or `apidoc.json` - ' + err.message
      throw err
    })
  const apiDocApiData = Object.values<any>(await import(path.resolve(apiDocPath, 'api_data.json'))).filter(x => x.type)

  // Generate the actual documentation
  const documentation = generate({
    apiDocProjectData,
    apiDocApiData,
    prepend,
    multi,
    ejsCompiler: await loadTemplate(template)
  })

  // Create the output files
  if (!multi) {
    // Single file documentation generation
    const singleDoc = documentation[0].content
    await fs.writeFile(output, singleDoc)
    return [{ outputFile: output, content: singleDoc }]
  }
  // Multi file documentation generation
  return Promise.all(
    documentation.map(async aDoc => {
      const filePath = path.resolve(outputPath, `${aDoc.name}.md`)
      await fs.writeFile(filePath, aDoc.content)
      return { outputFile: filePath, content: aDoc.content }
    })
  )
}
