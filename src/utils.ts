import * as core from '@actions/core'

export class Logger {
  static log(...args: any[]) {
    const message = args.map(arg => JSON.stringify(arg)).join(' ')
    core.info(message)
  }

  static warn(message: string) {
    core.warning(message)
  }

  static error(message: string, ...args: any[]) {
    const formattedArgs = args.map(arg => JSON.stringify(arg)).join(' ')
    core.error(`${message}: ${formattedArgs}`)
  }
}
