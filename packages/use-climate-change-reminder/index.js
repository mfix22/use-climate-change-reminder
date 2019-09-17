#!/usr/bin/env node
var os = require('os')
var fs = require('fs')
var path = require('path')

/* https://github.com/feross/funding */
var LIMIT_FILE_PATH = path.join(os.tmpdir(), 'climate-change-message-shown')
var LIMIT_TIMEOUT = 60 * 1000

function isShownRecently() {
  try {
    var lastShown = fs.statSync(LIMIT_FILE_PATH).mtime
    return Date.now() - lastShown < LIMIT_TIMEOUT
  } catch (e) {}
  return false
}

function markShown() {
  try {
    fs.writeFileSync(LIMIT_FILE_PATH, '')
  } catch (err) {}
}

try {
  // if (isShownRecently()) return

  if (
    ['silent', 'error'].indexOf(process.env.npm_config_loglevel) > -1 ||
    (process.env.npm_config_loglevel === 'warn' && !process.version.startsWith('v6.'))
  )
    return

  console.log(require('climate-change-reminder')())
  markShown()
} catch (err) {
  // pass
}
