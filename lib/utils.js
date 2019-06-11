'use strict'

const fs = require('fs')
const path = require('path')

/**
 * Recursively create an arborescence to the given path
 * @param {String} path Path to follow
 * @returns {void}
 */
const mkdirp = path => fs.mkdirSync(path, { recursive: true })

/**
 * Get object values
 * @param {Object} obj Source object
 * @returns {Object[]} Array of values of every object key
 */
const objectValues = obj => Object.keys(obj).map(key => obj[key])

/**
 * Make array values unique
 * @param {String[]} array Source array of strings
 * @returns {String[]} Array of unique values
 */
const unique = array => array.filter((it, i, ar) => ar.indexOf(it) === i)

/**
 * Check a path exists on the file system
 * @param {*} path Path to check existance from
 * @returns {void}
 * @throws Path does not exist
 */
const checkPathExists = path => {
  try {
    fs.accessSync(path)
  } catch (err) {
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
 * @param {String} path Output path of the generated documentation file
 * @param {Object} config Object passed to the EJS compiler
 * @param {Function} ejsCompiler EJS compiler function
 * @returns {void} The generated file
 * @throws Invalid template
 */
const createDoc = (path, config, ejsCompiler) => fs.writeFileSync(path, generateDoc(config, ejsCompiler))

module.exports = { mkdirp, objectValues, unique, checkPathExists, importApiDocData, generateDoc, createDoc }
