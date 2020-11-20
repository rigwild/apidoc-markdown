import ejs from 'ejs'
import { promises as fs } from 'fs'
import path from 'path'

export const TEMPLATES_PATH = path.resolve(__dirname, '..', 'templates')
export const DEFAULT_TEMPLATE_PATH = path.resolve(TEMPLATES_PATH, 'default.md')

/**
 * Recursively create an arborescence to the given path
 *
 * @param p Path to follow
 */
export const mkdirp = (p: string) => fs.mkdir(p, { recursive: true })

/**
 * Make array values unique
 *
 * @param arr Source array of strings
 */
export const unique = (arr: string[]) => [...new Set(arr)]

/**
 * Check a path exists on the file system
 *
 * @param p Path to check existance from
 * @throws Path does not exist
 */
export const pathExists = (p: string, logIfFail = true) =>
  fs
    .access(p)
    .then(() => true)
    .catch(err => (logIfFail && console.error(err), false))

/**
 * Check if a template is in the templates directory
 * @param name template name (without the `.md` file extension)
 */
export const isInTemplatesDir = (name: string) => fs.readdir(TEMPLATES_PATH).then(files => files.includes(`${name}.md`))

/**
 * Load the template and compile it with EJS
 * @param template template path, name or raw plain text
 * @param logIfFileNotFound turn off logging
 */
export const loadTemplate = async (template?: string, logIfFileNotFound = true) => {
  if (template) {
    if (await isInTemplatesDir(template))
      template = await fs.readFile(path.resolve(TEMPLATES_PATH, `${template}.md`), 'utf-8')
    else if (await pathExists(template, logIfFileNotFound)) template = await fs.readFile(template, 'utf-8')
  } else template = await fs.readFile(DEFAULT_TEMPLATE_PATH, 'utf-8')

  return ejs.compile(template)
}

/** Utility functions passed to the EJS template */
export const templateUtils = {
  /**
   * Convert a title to a Markdown-valid relative link
   * @param str Title to convert
   * @returns The valid linkable string
   */
  toLink: (str: string) => str.replace(/\s+/g, '-')
}
