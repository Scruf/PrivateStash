"use strict"
const crypto = require('crypto')
const fs = require('fs')

let fileContents =  fs.readFileSync('feed.xml')
let contentMD5Value = crypto.createHash('md5').update(fileContents).digest('base64')
console.log(contentMD5Value)