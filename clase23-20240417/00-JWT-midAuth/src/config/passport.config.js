import passport from "passport"
import passportjwt from "passport-jwt"
import { SECRET } from "../utils.js"

const buscaToken=(req)=>{
    let token=null

    if(req.signedCookies.coderCookie){
        console.log("busca token...!!!")
        token=req.signedCookies.coderCookie
    }

    return token
}

// 1)
export const initPassport=()=>{

    passport.use(
        "jwt",
        new passportjwt.Strategy(
            {
                secretOrKey: SECRET,
                jwtFromRequest: new passportjwt.ExtractJwt.fromExtractors([buscaToken])
            },
            async (contenidoToken, done)=>{
                try {
                    console.log("passport")

                    if(contenidoToken.nombre==="Juan"){
                        return done(null, false, {message:"El usuario Juan tiene el acceso temporalmente inhabilitado", detalle:"Contacte al administrador"})
                    }

                    // return done(null, false, {message:""})
                    return done(null, contenidoToken)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    // 1' serializer / deserializer NO SESSIONS, no hace falta

}