import { Router } from 'express';
import { UsuariosManager } from '../dao/UsuariosManager.js';
export const router=Router()

let usuariosManager=new UsuariosManager()

router.get('/',(req,res)=>{

    res.setHeader('Content-Type','text/html')
    res.status(200).render("home")
})

router.get('/usuarios',async(req,res)=>{

    let usuarios=await usuariosManager.getUsuarios()

    res.setHeader('Content-Type','text/html')
    res.status(200).render("usuarios", {
        usuarios
    })
})