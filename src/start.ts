import fs from 'fs'
import path from 'path'
import fg from 'fast-glob'
import colors from 'picocolors'
import checkWord from './checkWord'

const wordRE = /^[a-z]+$/i

const DEFAULT_IGNORE = [
  'node_modules',
  '**/node_modules',
  'dist',
  '**/dist',
  '*.svg',
  '.github',
  '.git',
  '*.yaml',
  '**/*.yaml',
  '*.toml',
  'LICENSE',
  '*.test.{j|ts}',
]

export async function checkContent(absolutePath: string) {
  const content = fs.readFileSync(absolutePath).toString()
  const words = content.split(' ')
  let hasErrors = false
  for (const word of words) {
    if (wordRE.test(word)) {
      const res = await checkWord(word.trim())
      if (!res) {
        hasErrors = true
        console.log(`${colors.bgRed(word)} ==> ${colors.cyan(absolutePath)}`)
      }
    }
  }
  return hasErrors
}

export async function start(files: string[] = [], ignores: string[] = []) {
  // const file = await checkWord('')
  // console.log(file)
  const root = process.cwd()
  let hasErrors = false
  files = files.length ? files : ['*']
  const entries = fg.sync(files, {
    ignore: Array.from(new Set([...DEFAULT_IGNORE, ...ignores])),
    baseNameMatch: true,
    globstar: true
  })
  for (const entry of entries) {
    const fileHasError = checkContent(path.join(root, entry))
    if (fileHasError && !hasErrors)
      hasErrors = true
  }
  if (!hasErrors)
    console.log(colors.green('All word is correct~~'))
}
