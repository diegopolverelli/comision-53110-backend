import jwt from "jsonwebtoken"
import {Router} from "express"
import { SECRET, passportCall } from "../utils.js"

export class CustomRouter{
    constructor(){
        this.router=Router()
        this.init()
    }

    init(){}

    getRouter(){
        return this.router
    }

    // getNoAuth(ruta, permisos=[], ...funciones){  // ... son operador rest
    //     // this.router.get(ruta, this.customResponses, this.accesos(permisos), ...funciones)  // ... son el operador spread
    //     this.router.get(ruta, this.customResponses, this.accesos(permisos), this.procesaFunciones(funciones))  // ... son el operador spread
    // }

    get(ruta, permisos=[], ...funciones){  // ... son operador rest
        // this.router.get(ruta, this.customResponses, this.accesos(permisos), ...funciones)  // ... son el operador spread
        this.router.get(ruta, passportCall("jwt", permisos), this.customResponses, this.accesos(permisos), this.procesaFunciones(funciones))  // ... son el operador spread
    }

    post(ruta, permisos=[], ...funciones){  // ... son operador rest
        this.router.post(ruta, passportCall("jwt", permisos), this.customResponses, this.accesos(permisos), this.procesaFunciones(funciones))  // ... son el operador spread
    }

    procesaFunciones(funciones=[]){
        return funciones.map(fn=>{
            return async(...params)=>{
                try {
                    fn(...params)
                } catch (error) {
                    return params[1].error500(`${error.message}`) // params, va a tener siempre req, res y eventualmente next... netonces params[1] es res
                }
            }
        })
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

        res.error500=(error)=>{
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error})
        }

        next()

    }

    // ruta: ["public"]   ["usuario", "premium", "ADMIN"]
    accesos(permisos=[]){
        return (req, res, next)=>{
            if(!Array.isArray(permisos)){
                return res.error500("Permisos de la ruta mal definidos. Contacte al administrador")
            }
    
            permisos=permisos.map(p=>p.toLowerCase())
    
            if(permisos.includes("public")){
                return next()
            }

            // if(!req.headers.authorization){
            //     return res.error401("Usuario no autenticado / falta token")
            // }

            // // Bearer asdlfkjasdlkfasdf9.adsfasdf
            // let token=req.headers.authorization.split(" ")[1]
            let usuario=req.user
            // try {
            //     usuario=jwt.verify(token, SECRET)
            // } catch (error) {
            //     return res.error401(`Error de autenticacion: ${error.message}`)
            // }

            if(!permisos.includes(usuario.rol.toLowerCase())){
                return res.error403("No tiene privilegios suficientes para acceder al recurso solicitado")
            }

            return next()

        }

    } // fin accesos fn()

}
