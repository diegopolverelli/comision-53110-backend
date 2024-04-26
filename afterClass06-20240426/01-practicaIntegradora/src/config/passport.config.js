import passport from "passport"
import local from "passport-local"
import passportJWT from "passport-jwt"
import { usuarioModelo } from "../dao/models/usuarioModelo.js"
import { SECRET, generaHash, validaPassword } from "../utils.js"
import { rolModelo } from "../dao/models/rolModelo.js"

const getToken=(req)=>{
    let token=null

    if(req.headers.authorization){
        // return res.error401("Usuario no autenticado / falta token")
        // Bearer asdlfkjasdlkfasdf9.adsfasdf
        token=req.headers.authorization.split(" ")[1]
    }

    return token
}

export const initPassport=()=>{

    passport.use(
        "jwt",
        new passportJWT.Strategy(
            {
                secretOrKey: SECRET,
                jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([getToken])
            },
            async (usuario, done)=>{
                try {
                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

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

    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField:"email",
            },
            async (username, password, done)=>{
                try {
                    let usuario=await usuarioModelo.findOne({email:username}).populate("rol").lean()
                    if(!usuario){
                        return done(null, false, {message:`Credenciales inválidas`})
                    }

                    if(!validaPassword(password, usuario.password)){
                        return done(null, false, {message:`Credenciales inválidas`})
                    }

                    usuario={...usuario}
                    delete usuario.password
                    return done(null, usuario)

                } catch (error) {
                    return done(error)
                }
            }
        )
    )

}