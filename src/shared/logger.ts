import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import path from 'path'
const { combine, timestamp, label, printf, prettyPrint } = format
/* 1. install winston and winston-daily-rotate-file
   2. define the formet the way you want to see the log, from winston doc
   3. create file transporter function
   4. create whatever log you wants to see
   */

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const formattedTimestamp = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  })

  return `${date.toDateString()}, TIME : 
  ${formattedTimestamp} [${label}] ${level}: ${message}`
})

const customTimestamp = timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })

/* created file transporter function to use in two logs*/
const createFileTransport = (filename: string) =>
  new DailyRotateFile({
    filename,
    datePattern: 'YYYY-DD-MM-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  })

const successLogger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'PHU SUCCESS LOG' }),
    customTimestamp,
    myFormat,
    prettyPrint()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    createFileTransport(
      path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'success-%DATE%.log'
      )
    ),
  ],
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'PHU SUCCESS LOG' }),
    customTimestamp,
    myFormat,
    prettyPrint()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    createFileTransport(
      path.join(process.cwd(), 'logs', 'winston', 'errors', 'error-%DATE%.log')
    ),
  ],
})

export { successLogger, errorLogger }
