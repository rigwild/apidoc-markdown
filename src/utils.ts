import { promises as fs } from 'fs'
import path from 'path'

import { ApiDocData } from './types'

/**
 * Recursively create an arborescence to the given path
 * @param p Path to follow
 */
export const mkdirp = (p: string) => fs.mkdir(p, { recursive: true })

/**
 * Make array values unique
 * @param arr Source array of strings
 */
export const unique = (arr: string[]) => [...new Set(arr)]

/**
 * Check a path exists on the file system
 * @param p Path to check existance from
 * @throws Path does not exist
 */
export const pathExists = (p: string) => fs.access(p).then(() => true).catch(err => (console.log(err), false))

/**
 * Import apiDoc's project data
 * @param apiDocPath Path to the apiDoc output directory
 * @returns apiDoc project data
 * @throws Path does not exist
 * @throws Not a JSON-valid file
 */
export const importApiDocData = async (apiDocPath: string): Promise<ApiDocData> => {
  // Be backward-compatible with legacy `apidoc.json`
  const projectData = await import(path.resolve(apiDocPath, 'api_project.json'))
    .catch(() => import(path.resolve(apiDocPath, 'apidoc.json')))

  return ({
    projectData,
    apiData: Object.values<any>((await import(path.resolve(apiDocPath, 'api_data.json')))).filter((x: any) => x.type)
  })
}