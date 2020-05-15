#!/usr/bin/env node

'use strict'

// Collect yargs CLI options
const argv = require('../dist/cli').default

// Start the binary
require('../dist/index').generateMarkdownFileSystem(argv)

// Check for update
require('update-notifier')({ pkg: require('../package.json') }).notify()
