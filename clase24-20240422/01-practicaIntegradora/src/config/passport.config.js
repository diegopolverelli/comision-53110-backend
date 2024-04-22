import passport from "passport"
import local from "passport-local"
import { usuarioModelo } from "../dao/models/usuarioModelo.js"
import { generaHash } from "../utils.js"
import { rolModelo } from "../dao/models/rolModelo.js"

export const initPassport=()=>{

    passport.use(
        "registro",
        new local.Strategy(
            {
                usernameField:"email",
                passReqToCallback: true
            },
            async (req, username, password, done)=>{
                try {
                    let {nombre}=req.body
                    if(!nombre){
                        return done(null, false, {message:"Complete nombre"})
                    }

                    let existe=await usuarioModelo.findOne({email:username})
                    if(existe){
                        return done(null, false, {message:`Ya existe un usuario con email ${username} en BD`})
                    }

                    password=generaHash(password)

                    let rol=await rolModelo.findOne({descrip:"usuario"})
                    if(!rol){
                        rol=await rolModelo.create({descrip:"usuario"})
                    }
                    rol:rol._id

                    let usuario=await usuarioModelo.create({
                        nombre, email:username, password, rol
                    })

                    return done(null, usuario)

                } catch (error) {
                    return done(error)
                }
            }
        )
    )

}