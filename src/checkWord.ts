import normalWords from '../words/big.js'
import additionalWords from '../words/additional.js'

let normalWordMap = null

const splitUpWordRE = /(?=[A-Z])/

function setNormalMap() {
  normalWordMap = {}
  normalWords.forEach((word: string) => {
    normalWordMap[word] = true
  })
}

function checkNormalWord(word: string) {
  if (normalWordMap == null)
    setNormalMap()
  if (normalWordMap[word.toLocaleLowerCase()])
    return true
  // 如果是驼峰单词，每个都检查下
  const splitWords = word.split(splitUpWordRE)
  for (const w of splitWords) {
    if (!normalWordMap[w.toLocaleLowerCase()] && !checkAdditionalWord(w.toLocaleLowerCase()))
      return false
  }
  return true
}

function checkAdditionalWord(word: string) {
  return additionalWords[word]
}

export default async function checkWord(word: string) {
  return checkAdditionalWord(word) || checkNormalWord(word)
}