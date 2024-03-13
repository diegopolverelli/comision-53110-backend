import { Router } from "express";
import { UsuariosManager } from "../classes/UsuariosManager.js";
export const router=Router()

const usuariosManager=new UsuariosManager()

router.get('/',async(req,res)=>{

    let usuarios=await usuariosManager.getUsuarios()

    res.status(200).json({
        usuarios
    })
})

router.post('/',async(req, res)=>{
    let {nombre, email, apellido}=req.body
    if(!nombre || !email){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Faltan datos: nombre y email obligatorios...!!!`})
    }

    // let usuarios=usuariosManager.getUsuarios()

    // let existe=usuarios.find(u=>u.email===email)
    // let existe=await usuariosManager.getUsuarioByEmail(email)    
    if(existe){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`El usuario con email ${email} ya existe en BD...!!!`})
    }

    try {
        let nuevoUsuario=await usuariosManager.addUsuario({nombre, email, apellido})
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:nuevoUsuario});
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:error.message
            })
        
    }

})