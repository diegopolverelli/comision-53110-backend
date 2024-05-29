import {fileURLToPath} from 'url';
import { dirname } from 'path';
import winston from "winston"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const logger=winston.createLogger(
    {
        transports: [
            new winston.transports.Console(
                {
                    level: "info",
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                }
            ),
            new winston.transports.Console(
                {
                    level: "silly",
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        // winston.format.colorize(),
                        winston.format.prettyPrint()
                    )
                }
            ),
            new winston.transports.File(
                {
                    level: "warn",
                    filename: "./src/logs/error.log",
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        // winston.format.colorize(),
                        winston.format.prettyPrint()
                    )
                }
            )            
        ]
    }
)


export const middLogg=(req, res, next)=>{
    req.logger=logger
    next()
}