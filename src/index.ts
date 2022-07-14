import cac from 'cac'
import { version } from '../package.json'
import { start } from './start'

const cli = cac()

cli
  .command('[...files]', 'check files')
  // .option('-i, --ignore <ignore>', 'ignore files')
  .action(async (files: string[], options: any) => {
    start(files);
  })
  .version(version)

cli.help()

cli.parse()
