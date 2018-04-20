#!/usr/bin/env node

const sharp = require('sharp')
const fs = require('fs')
const img = process.argv[2]
const maxDimension = parseInt(process.argv[3],10) || 1600

if (!img) {
  console.log('Image path must be provided')
  process.exit(1)
}

if (!fs.existsSync(img)) {
  console.log('No image exists at that path')
  process.exit(1)
}

console.log(`Resizing ${img} to max size of ${maxDimension}px`)

const originalSize = fs.statSync(img).size

sharp(img)
  .resize(maxDimension, maxDimension)
  .max()
  .withoutEnlargement()
  .toBuffer()
  .then(result => {
    fs.writeFile(img, result, err => {
      if(err) {
        console.log('Operation failed')
        console.log(err)
        process.exit(1)
      }
      console.log(`Done. Size ${tokB(originalSize)}kB -> ${tokB(result.byteLength)}kB`)
    })
  })

function tokB(bytes) {
  return (bytes / 1e3).toFixed(2)
}