'use strict'

var crypto = require('crypto')

module.exports = etag

function etag (entity, opts) {
  if (Object(entity) === entity) {
    opts = entity
    entity = opts.entity
  }

  opts = opts || {}
  opts.algorithm = opts.algorithm || 'md5'
  opts.encoding = opts.encoding || 'utf8'
  opts.output = opts.output || 'base64'

  var hash

  try {
    hash = crypto
      .createHash(opts.algorithm)
      .update(entity, opts.encoding)
      .digest(opts.output)
  } catch (e) {
    return Error('oh oh')
  }

  return (opts.output === 'base64') ? hash.replace(/=+$/, '') : hash
}

