import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, successLogger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    successLogger.info('database connected successfully')
    app.listen(config.port, () => {
      successLogger.info(`university app is listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`failed to connect ${error}`)
  }
}
main()
