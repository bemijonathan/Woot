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
    // if process.env is not local then don't log the error
    const formattedArgs = args.map(arg => JSON.stringify(arg)).join(' ')
    core.error(`${message}: ${formattedArgs}`)
  }
}

export class Templates {
  static warning(message: string) {
    return `
    **⚠️ Warning:**
    ${message}
    `
  }
}
