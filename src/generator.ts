import path from 'path'
import fs from 'fs/promises'
import ejs from 'ejs'
import semverGt from 'semver/functions/gt'

import {
  createDocOrThrow,
  loadFromCliParamOrApiDocProject,
  loadTemplate,
  mkdirp,
  pathExists,
  templateUtils,
  unique
} from './utils'
import { ConfigurationObject, ConfigurationObjectCLI } from './types'

/**
 * Get the documentation generator
 *
 * @param param0 Documentation generator parameters
 * @returns The single or multi file EJS compiler, ready for usage
 */
export const generate = async ({
  apiDocProjectData,
  apiDocApiData,
  prepend,
  multi,
  header,
  footer,
  ejsCompiler
}: Omit<ConfigurationObject, 'template'> & { ejsCompiler: ejs.AsyncTemplateFunction }) => {
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
    header,
    footer,
    prepend
  }

  return !multi
    ? [{ name: 'main', content: await ejsCompiler({ ...templateConfig, data: apiByGroupAndName }) }]
    : await Promise.all(
        apiByGroupAndName.map(async x => ({
          name: x.name as string,
          content: await ejsCompiler({ ...templateConfig, data: [x] })
        }))
      )
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
  header,
  footer,
  multi
}: ConfigurationObject) =>
  generate({
    apiDocProjectData,
    apiDocApiData,
    header,
    footer,
    prepend,
    multi,
    ejsCompiler: await loadTemplate(template, false)
  })

/**
 * Generate mardown documentation and create output file(s).
 *
 * @param param0 Generator configuration
 * @returns Generated documentation
 * @throws Some CLI command parameters are missing or invalid
 */
export const generateMarkdownFileSystem = async ({
  input,
  output,
  template,
  prepend,
  header,
  footer,
  multi,
  createPath
}: ConfigurationObjectCLI) => {
  // Check the input path exists
  if (!input) throw new Error('`cli.input` is required but was not provided.')
  if (!(await pathExists(input)))
    throw new Error(`The \`cli.input\` path does not exist or is not readable. Path: ${input}`)

  // Check the output path exists (only parent directory if unique file)
  if (!output) throw new Error('`cli.output` is required but was not provided.')

  // Recursively create directory arborescence if cli option is true
  if (createPath) await mkdirp(output.toLowerCase().endsWith('.md') ? path.dirname(output) : output)

  const outputPath = multi ? output : path.parse(path.resolve('.', output)).dir
  if (!(await pathExists(outputPath)))
    throw new Error(`The \`cli.output\` path does not exist or is not readable. Path: ${outputPath}`)

  const { apiDocProjectData, apiDocApiData } = createDocOrThrow(input)

  // Check header, footer and prepend file path exist
  header = await loadFromCliParamOrApiDocProject('header', header, apiDocProjectData)
  footer = await loadFromCliParamOrApiDocProject('footer', footer, apiDocProjectData)
  prepend = await loadFromCliParamOrApiDocProject('prepend', prepend, apiDocProjectData)

  // Generate the actual documentation
  const documentation = await generate({
    apiDocProjectData,
    apiDocApiData,
    header,
    footer,
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
