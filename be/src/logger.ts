import winston, { format, transports } from 'winston';
import path from 'path';

export class Logger {
  private readonly winstonLogger: winston.Logger;

  private static instance: Logger;

  private constructor(private module: NodeModule) {
    this.winstonLogger = Logger.createWinstonLogger();
  }

  public static getInstance(module: NodeModule) {
    Logger.instance = new Logger(module);
    return Logger.instance;
  }

  private static createWinstonLogger() {
    const logFormat = format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    );
    const transportList = [
      new transports.Console({
        format: format.combine(format.timestamp(), format.colorize(), logFormat),
      }),
    ];
    return winston.createLogger({
      transports: transportList,
      exitOnError: false,
    });
  }

  /**
   * Log a message with the level of "Debug".
   */
  debug(message: any): void {
    this.createLog('debug', message);
  }

  /**
   * Log a message with the level of "Info".
   */
  info(message: any): void {
    this.createLog('info', message);
  }

  /**
   * Log a message with the level of "Error".
   */
  error(message: any): void {
    this.createLog('error', message);
  }

  /**
   * Log a message with the level of "Warning".
   */
  warn(message: any): void {
    this.createLog('warn', message);
  }

  critical(message: any): void {
    this.createLog('critical', message);
  }

  private createLog(level: string, message: string) {
    const BASE_PATH = path.resolve('.');
    const fileName = this.module.filename;
    const moduleName = fileName.split(BASE_PATH)[1];
    const messageString = typeof message === 'object' && message
      ? JSON.stringify(message, null, 2)
      : message;
    this.winstonLogger.log(level, `[${moduleName}] ${messageString}`);
  }
}

const logger = Logger.getInstance(module);

export default logger;
