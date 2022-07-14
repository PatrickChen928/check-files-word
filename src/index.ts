import cac from 'cac'
import { start } from './start'

const cli = cac()

cli
  .command('[...files]', 'check files')
  .option('-i, --ignore <ignore>', 'ignore files')
  .option('-f, --filter <filter>', 'filtters')
  .action(async (files: string[], options: any) => {
    start(files, options.i, options.f);
  })

cli.help()

cli.parse()
