import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/UsuariosManagerMONGO.js';
import { creaHash, validaPassword } from '../utils.js';
export const router=Router()

let usuariosManager=new UsuariosManagerMongo()

router.post('/registro',async(req,res)=>{

    let {nombre, email, password} =req.body
    if(!nombre || !email || !password){
        // res.setHeader('Content-Type','application/json');
        // return res.status(400).json({error:`Faltan datos`})
        return res.redirect("/registro?error=Faltan datos")
    }

    let existe=await usuariosManager.getBy({email})
    if(existe){
        // res.setHeader('Content-Type','application/json');
        // return res.status(400).json({error:`Ya existen usuarios con email ${email}`})
        return res.redirect(`/registro?error=Ya existen usuarios con email ${email}`)

    }

    // validaciones extra...
    password=creaHash(password)

    try {
        let nuevoUsuario=await usuariosManager.create({nombre, email, password})

        // res.setHeader('Content-Type','application/json');
        // return res.status(200).json({payload:"Registro exitoso", nuevoUsuario});
        return res.redirect(`/registro?mensaje=Registro exitoso para ${nombre}`)

    } catch (error) {
        return res.redirect(`/registro?error=Error 500 - error inesperado`)
        
    }


})

router.post('/login',async(req,res)=>{

    let {email, password} =req.body
    if(!email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Faltan datos`})
    }

    let usuario=await usuariosManager.getBy({email})
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales incorrectas`})
    }

    // if(usuario.password!==creaHash(password)){
    if(!validaPassword(usuario, password)){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales incorrectas`})
    }

    usuario={...usuario}
    delete usuario.password
    req.session.usuario=usuario // en un punto de mi proyecto

    res.setHeader('Content-Type','application/json')
    res.status(200).json({
        message:"Login correcto", usuario
    })
})


router.get('/logout',(req,res)=>{

    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${e.message}`
                }
            )
            
        }
    })
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        message:"Logout exitoso"
    });
});