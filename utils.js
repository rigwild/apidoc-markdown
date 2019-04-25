'use strict'

// underscore `groupBy` polyfill : https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_groupby
const groupBy = (data, comparator) =>
  data.reduce((r, v, i, a, k = comparator(v)) => ((r[k] || (r[k] = [])).push(v), r), {})

module.exports = { groupBy }
