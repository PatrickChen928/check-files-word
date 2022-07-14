"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = __importDefault(require("cac"));
const start_1 = require("./start");
const cli = cac_1.default();
cli
    .command('[...files]', 'check files')
    .option('-i, --ignore <ignore>', 'ignore files')
    .option('-f, --filter <filter>', 'filtters')
    .action(async (files, options) => {
    start_1.start(files, options.i, options.f);
});
cli.help();
cli.parse();
