#!/usr/bin/env node

'use strict'

// Collect yargs CLI options
const argv = require('../dist/cli').default

// Start the binary
require('../dist/index').generateMarkdownFileSystem(argv)

// Check for update
async function checkUpdate() {
  const { default: updateNotifier } = await import('update-notifier')
  updateNotifier({ pkg: require('../package.json') }).notify()
}

checkUpdate()
