'use strict'

var http = require('http')

var etag = require('./etag')
var pkg = JSON.stringify(require('./package.json'))

function payload (req, res) {
  const data = {
    a: Date.now() * Math.random(),
    b: Date.now() * Math.random(),
    c: Date.now() * Math.random(),
    d: Date.now() * Math.random(),
    e: Date.now() * Math.random(),
    f: Date.now() * Math.random(),
    g: Date.now() * Math.random(),
    h: Date.now() * Math.random()
  }

  delete data.d
  var val= 1
  
  for (var i = 0; i < 100; i++) {
    val += data.g
  }
  
  return '' + val
}

function a (req, res) {
  var tag = etag({ entity: pkg, algorithm: 'md5' })

  if (tag !== 'etag-error') {
    res.setHeader('ETag', tag)
  }

  res.end(payload())
}

function b (req, res) {
  var tag = etag({entity: pkg, algorithm: 'sha256'})

  if (tag !== 'etag-error') {
    res.setHeader('ETag', tag)
  }

  res.end(payload())
}

function c (req, res) {
  var tag = etag({ entity: pkg, algorithm: 'sha512WithRsaEncryption'})

  if (tag !== 'etag-error') {
    res.setHeader('ETag', tag)
  }

  res.end(payload())
}

http.createServer(function (req, res) {
  switch (true) {
    case /\/a$/.test(req.url): return a(req, res)
    case /\/b$/.test(req.url): return b(req, res)
    case /\/c$/.test(req.url): return c(req, res)
  }
}).listen(3000)

process.on('SIGINT', () => process.exit())
