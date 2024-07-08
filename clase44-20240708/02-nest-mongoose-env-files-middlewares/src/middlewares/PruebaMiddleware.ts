import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PruebaMiddleware implements NestMiddleware {
  use(req: Request|any, res: Response, next: NextFunction) {
    console.log('Request...');
    Logger.debug("Prueba de middleware", "PruebaMiddleware")
    if(req.query.name){
        // let datos=req.query.name.toString().toUpperCase
        req.query.name=req.query.name.toUpperCase()
        Logger.debug(req.query.name, "PruebaMiddleware")
    }

    next();
  }
}

interface PersonaInterface{
    nombre:string
    edad:number
}

class Persona implements PersonaInterface{
    datos:string
    nombre:string
    edad: number;
    constructor(){}
    saludar(){
        console.log("hola")
    }
}