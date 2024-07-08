import { Logger } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"


export const PruebaMiddleware=(req:Request, res:Response, next: NextFunction)=>{
    Logger.verbose(req.url, "PruebaMiddleware")
    Logger.verbose(`Query params que vienen en la requires: ${JSON.stringify(req.query, null, 5)}`, "PruebaMiddleware")

    next()
}