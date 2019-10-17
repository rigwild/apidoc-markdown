#!/usr/bin/env node

'use strict'

// Collect yargs CLI options
const argv = require('../dist/cli').default

// Start the binary
require('../dist').generateMarkdownFile(argv)
