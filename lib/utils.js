'use strict'

const fs = require('fs')
const path = require('path')

/**
 * Recursively create an arborescence to the given path
 * @param {String} p Path to follow
 * @returns {void}
 */
const mkdirp = p => fs.mkdirSync(p, { recursive: true })

/**
 * Make array values unique
 * @param {String[]} arr Source array of strings
 * @returns {String[]} Array of unique values
 */
const unique = arr => [...new Set(arr)]

/**
 * Check a path exists on the file system
 * @param {*} p Path to check existance from
 * @returns {void}
 * @throws Path does not exist
 */
const checkPathExists = p => {
  try {
    fs.accessSync(p)
  }
  catch (err) {
    throw new Error(`Could not access the path. Check it exists and have read permission on it.\n${err}`)
  }
}

/**
 * @typedef {Object} ApiDocData
 * @property {Object} projectData apiDoc project's data
 * @property {Object[]} apiData apiDoc documentation data
 */
/**
 * Import apiDoc's project data
 * @param {String} apiDocPath Path to the apiDoc output directory
 * @returns {ApiDocData} apiDoc project data
 * @throws Path does not exist
 * @throws Not a JSON-valid file
 */
const importApiDocData = apiDocPath => ({
  projectData: require(path.resolve(apiDocPath, 'api_project.json')),
  apiData: require(path.resolve(apiDocPath, 'api_data.json')).filter(x => x.type)
})

/**
 * Generate a documentation
 * @param {Object} config Object passed to the EJS compiler
 * @param {Function} ejsCompiler EJS compiler function
 * @returns {String} The generated documentation
 * @throws Invalid template
 */
const generateDoc = (config, ejsCompiler) => ejsCompiler(config)

/**
 * Create a documentation file
 * @param {String} p Output path of the generated documentation file
 * @param {Object} config Object passed to the EJS compiler
 * @param {Function} ejsCompiler EJS compiler function
 * @returns {void} The generated file
 * @throws Invalid template
 */
const createDoc = (p, config, ejsCompiler) => fs.writeFileSync(p, generateDoc(config, ejsCompiler))

module.exports = { mkdirp, unique, checkPathExists, importApiDocData, generateDoc, createDoc }
