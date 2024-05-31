import passport from "passport"
import local from "passport-local"
import passportJWT from "passport-jwt"
import { UsuariosDAO } from "../dao/UsuariosDAO.js"
import { CarritosDAO } from "../dao/CarritosDAO.js"
import { generaHash, validaPass } from "../utils.js"
import { config } from "./config.js"

const usuariosDAO=new UsuariosDAO()
const carritosDAO=new CarritosDAO()

const buscarToken=(req)=>{
    let token=null

    if(req.cookies.coderCookie){
        token=req.cookies.coderCookie
    }

    return token
}

export const inicioPassport=()=>{

    passport.use("registro", new local.Strategy(
        {passReqToCallback:true, usernameField: "email"},
        async(req, username, password, done)=>{
            try {
                let {nombre, rol}=req.body
                if(!nombre){
                    return done(null, false, {message: "Complete el nombre..."})
                }

                let existe=await usuariosDAO.getOneBy({email:username})
                if(existe){
                    return done(null, false, {message: `Ya existe un usuario con email ${username} en BD...!!!`})
                }

                console.log(password)
                // resto de validaciones pertinentes... 
                password=generaHash(password)

                let nuevoCarrito=await carritosDAO.create()
                let nuevoUsuario=await usuariosDAO.create({nombre, email:username, password, rol, carrito: nuevoCarrito._id})
                delete nuevoUsuario.password  // eliminar info confidencial
                return done(null, nuevoUsuario)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("login", new local.Strategy(
        {usernameField:"email"},
        async(username, password, done)=>{
            try {
                let usuario=await usuariosDAO.getOneBy({email: username})
                if(!usuario){
                    return done(null, false, {message:"Credenciales invalidas"})
                }
                if(!validaPass(password, usuario.password)){
                    return done(null, false, {message:"Credenciales invalidas"})
                }
                delete usuario.password

                return done(null, usuario)

            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: config.general.SECRET,
            jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([buscarToken])
        },
        async (usuario, done)=>{
            try {
                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))

}