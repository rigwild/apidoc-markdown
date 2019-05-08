#!/usr/bin/env node

'use strict'

// Collect yargs CLI options
const argv = require('../lib/cli')

// Start the binary
require('../lib').setup(argv)
