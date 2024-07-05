import { Router } from 'express';
import { usuariosModelo } from '../dao/models/usuariosModelo.js';
export const router=Router()

router.get('/',async(req,res)=>{

    // let usuarios="todos los usuarios"
    let usuarios=await usuariosModelo.findAll()

    res.setHeader('Content-Type','application/json')
    res.status(200).json({usuarios})
})

router.post('/',async(req,res)=>{

    let datosUsurio=req.body
    // VALIDAR...!!!

    try {
        let nuevoUsuario=await usuariosModelo.create(datosUsurio)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({nuevoUsuario});
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }

})


router.get('/:id',async(req,res)=>{

    let {id}=req.params
    // let usuarios="todos los usuarios"
    let usuario=await usuariosModelo.findOne({where:{id}})
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No existen usuarios con id ${id}`})
    }

    res.setHeader('Content-Type','application/json')
    res.status(200).json({usuario})
})

router.put('/:id',async(req,res)=>{

    let {id}=req.params
    let {name, email}=req.body
    // let usuarios="todos los usuarios"

    // VALIDACIONES FALTAN...!!!
    let usuario=await usuariosModelo.findOne({where:{id}})
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No existen usuarios con id ${id}`})
    }

    if(name){
        usuario.name=name
    }
    if(email){
        usuario.email=email
    }
    await usuario.save()

    res.setHeader('Content-Type','application/json')
    res.status(200).json({usuario})
})

router.delete('/:id',async(req,res)=>{

    let {id}=req.params

    let usuario=await usuariosModelo.findOne({where:{id}})
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No existen usuarios con id ${id}`})
    }

    let usuarioEliminado=await usuario.destroy()

    res.setHeader('Content-Type','application/json')
    res.status(200).json({usuarioEliminado})
})