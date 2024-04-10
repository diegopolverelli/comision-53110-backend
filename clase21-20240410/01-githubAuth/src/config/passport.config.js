import passport from "passport"
import github from "passport-github2"
import { usuariosModelo } from "../models/usuario.model.js"

// 1)
export const initPassport=()=>{

    passport.use(
        "github",
        new github.Strategy(
            {
                clientID:"Iv1.dae5128bf875b8e8",
                clientSecret:"4fac3cf48d8068716b8ce0233e1329cb585052c8",
                callbackURL:"http://localhost:3000/api/sessions/callbackGithub",
            },
            async function(accessToken, refreshToken, profile, done){
                try {
                    // console.log(profile)
                    // profile.email[0].value
                    // return done(null, false)  // falta password
                    // return done(null, usuario)  // todo salió OK
                    let nombre=profile._json.name
                    let email=profile._json.email
                    if(!email){
                        return done(null, false)
                    }
                    let usuario=await usuariosModelo.findOne({email})
                    if(!usuario){
                        usuario=await usuariosModelo.create({
                            nombre, email, 
                            profileGithub: profile
                        })
                    }

                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    // 1') solo si manejas sesiones
    passport.serializeUser((usuario, done)=>{
        return done(null, usuario._id)
    })

    passport.deserializeUser((usuario, done)=>{
        return done(null, usuario)
    })

}