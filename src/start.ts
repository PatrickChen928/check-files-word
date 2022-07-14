import fs from 'fs'
import path from 'path'
import fg from 'fast-glob'
import colors from 'picocolors'
import checkWord from './checkWord'

const wordRE = /^[a-z]+$/i

function checkContent(absolutePath: string) {
  const content = fs.readFileSync(absolutePath).toString()
  const words = content.split(' ')
  let hasErrors = false
  words.forEach((word) => {
    if (wordRE.test(word)) {
      const res = checkWord(word.trim())
      if (!res) {
        hasErrors = true
        console.log(`${colors.bgRed(word)} ==> ${colors.cyan(absolutePath)}`)
      }
    }
  })
  return hasErrors
}

export async function start(files: string[], _i: string, _f: string) {
  // const file = await checkWord('')
  // console.log(file)
  const root = process.cwd()
  let hasErrors = false
  // console.log(files, 'filesfilesfiles')
  if (!files || files.length === 0) {
    const entries = fg.sync(['*'], {
      ignore: [
        'node_modules',
        '**/node_modules',
        'dist',
        '**/dist',
        '*.svg',
        '.github',
        '*.yaml',
        '**/*.yaml',
        '*.toml',
        'LICENSE'
      ],
      baseNameMatch: true,
      globstar: true
    })
    for (const entry of entries) {
      const fileHasError = checkContent(path.join(root, entry))
      if (fileHasError && !hasErrors)
        hasErrors = true
    }
  } else {
    for (const file of files) {
      const fileHasError = checkContent(path.join(root, file))
      if (fileHasError && !hasErrors)
        hasErrors = true
    }
  }
  if (!hasErrors)
    console.log(colors.green('All word is correct~~'))
}
