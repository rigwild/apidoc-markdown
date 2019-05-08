'use strict'

/**
 * Convert a title to a Markdown-valid relative link
 * @param {String} str title to convert
 * @returns {String} the valid linkable string
 */
const toLink = str => str.replace(/\s+/g, '-')

module.exports = { toLink }
