const sharp = require('sharp')
const fs = require('fs')

const images = filterForImages(walkDirectory(__dirname + '/static/uploads'))


images.forEach(image => {
  console.log(`resizing ${image}`)


  sharp(image)
    .resize(1600, 1600)
    .max()
    .withoutEnlargement()
    .toFile(updateFileName(image), (err, info) => err ? console.warn(err) : console.log(info))
  })


function walkDirectory(dir) {
  return fs.readdirSync(dir).reduce((prev, curr) => {
    const fullPath = dir + '/' + curr

    if (fs.statSync(fullPath).isDirectory()) {
      return prev.concat(walkDirectory(fullPath))
    }
    return prev.concat(fullPath)
  }, [])
}

function filterForImages(files) {
  const exts = ['jpeg', 'jpg', 'gif', 'png', 'webp']
  return files.filter(file => {
    const parts = file.split('.')
    const ext = parts[parts.length-1].toLowerCase()
    return exts.includes(ext)
  })
}

function updateFileName(filepath) {
  const parts = filepath.split('.').reverse()
  const [ext, ...rest] = parts

  return [...rest.reverse(), '.new', '.', ext].join('')
}