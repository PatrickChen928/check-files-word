"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import normalWords from '../words/big.js'
// import additionalWords from '../words/additional.js'
// import { reporter } from 'vfile-reporter'
const retext_1 = require("retext");
const retext_spell_1 = __importDefault(require("retext-spell"));
const dictionary_en_gb_1 = __importDefault(require("dictionary-en-gb"));
// let normalWordMap = null
// const splitUpWordRE = /(?=[A-Z])/
// function setNormalMap() {
//   normalWordMap = {}
//   normalWords.forEach((word: string) => {
//     normalWordMap[word] = true
//   })
// }
// function checkNormalWord(word: string) {
//   if (normalWordMap == null)
//     setNormalMap()
//   if (normalWordMap[word.toLocaleLowerCase()])
//     return true
//   // 如果是驼峰单词，每个都检查下
//   const splitWords = word.split(splitUpWordRE)
//   if (splitWords.length === 1)
//     return false
//   for (const w of splitWords) {
//     if (!normalWordMap[w.toLocaleLowerCase()] && !checkAdditionalWord(w.toLocaleLowerCase()))
//       return false
//   }
//   return true
// }
// function checkAdditionalWord(word: string) {
//   return additionalWords[word]
// }
async function checkWord(word) {
    return new Promise(r => {
        retext_1.retext()
            .use(retext_spell_1.default, dictionary_en_gb_1.default)
            .process('Some useles documeant.')
            .then((file) => {
            r(file);
        });
    });
    // return checkAdditionalWord(word) || checkNormalWord(word)
}
exports.default = checkWord;
