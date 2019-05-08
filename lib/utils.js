'use strict'

const fs = require('fs')
const path = require('path')

/**
 * underscore `groupBy` polyfill
 * @param {Object} data Object to group
 * @param {Function} reducer The reducer selecting the key to group from
 * @returns {Object} The object, groupped by the reducer's key
 * @see https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_groupby
 */
const groupBy = (data, reducer) =>
  data.reduce((r, v, i, a, k = reducer(v)) => ((r[k] || (r[k] = [])).push(v), r), {})

/**
 * Recursively create an arborescence to the given path
 * @param {String} path Path to follow
 * @returns {void}
 */
const mkdirp = path => fs.mkdirSync(path, { recursive: true })

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
 * @property {String} projectData apiDoc project's data
 * @property {String} apiData apiDoc documentation data
 */
/**
 * Import apiDoc's project data
 * @param {String} path Path to the apiDoc output directory
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

module.exports = { groupBy, mkdirp, checkPathExists, importApiDocData, generateDoc, createDoc }
