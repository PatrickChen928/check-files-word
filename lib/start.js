"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const fs_1 = __importDefault(require("fs"));
const picocolors_1 = __importDefault(require("picocolors"));
const checkWord_1 = __importDefault(require("./checkWord"));
const wordRE = /^[a-z]+$/i;
// function readGitIgnore() {
// }
function checkContent(absolutePath) {
    const content = fs_1.default.readFileSync(absolutePath).toString();
    const words = content.split(' ');
    let hasErrors = false;
    words.forEach((word) => {
        if (wordRE.test(word)) {
            const res = checkWord_1.default(word.trim());
            if (!res) {
                hasErrors = true;
                console.log(`${picocolors_1.default.bgRed(word)} ==> ${picocolors_1.default.cyan(absolutePath)}`);
            }
        }
    });
    return hasErrors;
}
async function start(files, _i, _f) {
    const file = await checkWord_1.default('');
    console.log(file);
    // const root = process.cwd()
    // let hasErrors = false
    // // console.log(files, 'filesfilesfiles')
    // const entries = fg.sync(['*'], {
    //   ignore: [
    //     'node_modules',
    //     '**/node_modules',
    //     'dist',
    //     '**/dist',
    //     '*.svg',
    //     '.github',
    //     '*.yaml',
    //     '**/*.yaml',
    //     '*.toml',
    //     'LICENSE'
    //   ],
    //   baseNameMatch: true,
    //   globstar: true
    // })
    // // console.log(entries)
    // for (const entry of entries) {
    //   const fileHasError = checkContent(path.join(root, entry))
    //   if (fileHasError && !hasErrors)
    //     hasErrors = true
    // }
    // for (const file of files) {
    //   const fileHasError = checkContent(path.join(root, file))
    //   if (fileHasError && !hasErrors)
    //     hasErrors = true
    // }
    // if (!hasErrors)
    //   console.log(colors.green('All word is correct~~'))
}
exports.start = start;
