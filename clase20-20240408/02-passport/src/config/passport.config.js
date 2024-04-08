import passport from "passport"
import local from "passport-local"
import { creaHash, validaPassword } from "../utils.js"
import { UsuariosManagerMongo } from "../dao/UsuariosManagerMONGO.js"

const usuariosManager=new UsuariosManagerMongo()

// 1) definir la funcion de configuracion
export const inicializaPassport=()=>{

    passport.use(
        "registro",
        new local.Strategy(
            {
                usernameField:"email", 
                passReqToCallback: true
            },
            async function(req, username, password, done){
                try {
                    let {nombre, email} =req.body
                    if(!nombre || !email){
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(400).json({error:`Faltan datos`})
                        // return res.redirect("/registro?error=Faltan datos")
                        return done(null, false)
                    }
                
                    let existe=await usuariosManager.getBy({email})
                    if(existe){
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(400).json({error:`Ya existen usuarios con email ${email}`})
                        // return res.redirect(`/registro?error=Ya existen usuarios con email ${email}`)
                        return done(null, false)
                    }
                
                    // validaciones extra...
                    password=creaHash(password)
                
                    let nuevoUsuario=await usuariosManager.create({nombre, email, password})
            
                    // res.setHeader('Content-Type','application/json');
                    // return res.status(200).json({payload:"Registro exitoso", nuevoUsuario});
                    // return res.redirect(`/registro?mensaje=Registro exitoso para ${nombre}`)
                    return done(null, nuevoUsuario)

                                    
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
                usernameField: "email"
            },
            async (username, password, done)=>{
                try {
                    console.log({username})
                    let usuario=await usuariosManager.getBy({email:username})
                    if(!usuario){
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(401).json({error:`Credenciales incorrectas`})
                        return done(null, false)
                    }
                
                    // if(usuario.password!==creaHash(password)){
                    if(!validaPassword(usuario, password)){
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(401).json({error:`Credenciales incorrectas`})
                        return done(null, false)
                    }
                
                    return done(null, usuario)
                                    
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    // 1') SOLO SI USAN SESSION (sesiones), definir serializer y deserializer
    passport.serializeUser((usuario, done)=>{
        return done(null, usuario._id)
    })

    passport.deserializeUser(async (id, done)=>{
        let usuario=await usuariosManager.getBy({_id:id})
        return done(null, usuario)
    })

}