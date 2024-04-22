import jwt from "jsonwebtoken"
import { SECRET } from "../utils.js"

// export const auth=(req, res, next)=>{
//     let token=null

//     // verificar si llega el token
//     if(req.signedCookies.coderCookie){
//         token=req.signedCookies.coderCookie
//     }

//     // if(req.headers.authorization){   // Bearer token
//     //     console.log(req.headers.authorization)
//     //     token=req.headers.authorization.split(" ")[1]
//     // }

//     // if(req.query.token){
//     //     token=req.query.token
//     // }

//     if(!token){
//         res.setHeader('Content-Type','application/json');
//         return res.status(401).json({error:`No hay usuarios autenticados / no existe token`})
//     }

//     // ver que sea valido el token recibido
//     try {
//         let usuario=jwt.verify(token, SECRET)
//         req.user=usuario
//     } catch (error) {
//         res.setHeader('Content-Type','application/json');
//         return res.status(500).json(
//             {
//                 error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
//                 detalle:`${error.message}`
//             }
//         )
        
//     }

//     next()
// }

export const auth=(accesos=[])=>{
    return (req, res, next)=>{
        accesos=accesos.map(a=>a.toLowerCase())

        if(accesos.includes("public")){
            return next()
        }

        if(!req.user || !req.user.rol){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`No existen usuarios autenticados`})
        }

        if(!accesos.includes(req.user.rol.toLowerCase())){
            res.setHeader('Content-Type','application/json');
            return res.status(403).json({error:`No tiene privilegios suficientes para acceder al recurso`})
        }

        next()
    }
}