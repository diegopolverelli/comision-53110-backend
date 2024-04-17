
import {Router} from "express"

export class CustomRouter{
    constructor(){
        this.router=Router()
        this.init()
    }

    init(){}

    getRouter(){
        return this.router
    }

    get(ruta, ...funciones){  // ... son operador rest
        this.router.get(ruta, this.customResponses, ...funciones)  // ... son el operador spread
    }

    post(ruta, ...funciones){  // ... son operador rest
        this.router.post(ruta, this.customResponses, ...funciones)  // ... son el operador spread
    }

    customResponses(req, res, next){
        res.success=(respuesta)=>{
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({
                payload:{
                    mensaje:"OK",
                    datos:respuesta
                }
            });
        }

        res.successCreate=(respuesta, objetoNuevo)=>{
            res.setHeader('Content-Type','application/json');
            return res.status(201).json({mensaje:respuesta, newEntity: objetoNuevo});
        }

        res.badRequest=(error)=>{
            // log a un archivo... 
            // peticion con fetch... para validar... 
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error})
        }

        res.error401=(error)=>{
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error})
        }

        res.error403=(error)=>{
            res.setHeader('Content-Type','application/json');
            return res.status(403).json({error})
        }

        next()

    }

    

}
