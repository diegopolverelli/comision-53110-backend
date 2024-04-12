import passport from "passport"
import local from "passport-local"
import github from "passport-github2"
import { usuarioModelo } from "../dao/models/usuario.model.js"
import { generaHash, validaPassword } from "../utils.js"

// 1)
export const initPassport=()=>{

    passport.use(
        "registro",
        new local.Strategy(
            {
                usernameField: "email", 
                passReqToCallback: true
            },
            async (req, username, password, done)=>{
                try {
                    let {nombre}=req.body
                    if(!nombre){
                        return done(null, false)
                    }

                    let existe=await usuarioModelo.findOne({email:username})
                    if(existe){
                        return done(null, false)
                    }

                    password=generaHash(password)

                    let usuario=await usuarioModelo.create({
                        nombre, password, email:username
                    })
                    if(usuario){
                        return done(null, usuario)
                    }else{
                        return done(null, false)
                    }

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
                usernameField: "email", 
            },
            async (username, password, done)=>{
                try {
                    let usuario=await usuarioModelo.findOne({email:username})
                    if(!usuario){
                        return done(null, false)
                    }

                    if(!validaPassword(password, usuario.password)){
                        return done(null, false)
                    }

                    return done(null, usuario)

                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        "github",
        new github.Strategy(
            {
                clientID:"completar con datos app github generada",
                clientSecret:"completar con datos app github generada",
                callbackURL:"http://localhost:3000/api/sessions/callbackGithub"
            },
            async (accessToken, refreshToken, profile, done)=>{
                try {
                    let {name:nombre, email}=profile._json
                    if(!email){
                        return done(null, false)
                    }
                    let usuario=await usuarioModelo.findOne({email})
                    if(!usuario){
                        usuario=await usuarioModelo.create(
                            {nombre, email, profileGithub:profile}
                        )
                    }
                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    // 1') serializer / deserializer (solo con sessions)

    passport.serializeUser((usuario, done)=>{
        return done(null, usuario)
    })

    passport.deserializeUser((usuario, done)=>{
        return done(null, usuario)
    })

}