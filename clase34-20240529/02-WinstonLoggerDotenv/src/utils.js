import {fileURLToPath} from 'url';
import { dirname } from 'path';
import winston from "winston"
import { config } from './config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

const customLevels={
    grave:0,
    medio:1, 
    info:2, 
    leve:3
}

export const logger=winston.createLogger(
    {
        levels: customLevels,
        transports:[
            new winston.transports.File({
                level: "grave",
                filename: "./src/logs/error.log",
                format: winston.format.combine(
                    winston.format.timestamp(),
                    // winston.format.colorize({
                    //     colors:{grave:"red", medio:"yellow", info:"blue", leve: "green"}
                    // }),
                    winston.format.json()
                )
            })
        ]
    }
)


const transporteFile=new winston.transports.File({
    level: "grave",
    filename: "./src/logs/erroresGraves.log",
    format: winston.format.combine(
        winston.format.timestamp(),
        // winston.format.colorize({
        //     colors:{grave:"red", medio:"yellow", info:"blue", leve: "green"}
        // }),
        winston.format.json()
    )
})

const transporteConsola=new winston.transports.Console(
    {
        level: "leve", 
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize({
                colors:{grave:"red", medio:"yellow", info:"blue", leve: "green"}
            }),
            winston.format.simple()
        )
    }
)

if(config.MODE!="production"){
    logger.add(transporteConsola)
}

export const middLogg=(req, res, next)=>{
    req.logger=logger
    next()
}