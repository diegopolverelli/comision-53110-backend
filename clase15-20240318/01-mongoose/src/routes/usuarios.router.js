import { Router } from "express";
import { UsuariosManager } from "../dao/UsuariosManager.js";
import { creaHash } from "../utils.js";
import mongoose, { mongo } from "mongoose";
export const router=Router()

const usuariosManager=new UsuariosManager

router.get('/',async(req,res)=>{

    try {
        let usuarios=await usuariosManager.getUsuarios()
        res.status(200).json({
            usuarios
        })
    } catch (error) {
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
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Id invalido`})
    }

    try {
        let usuario=await usuariosManager.getUsuarioById(id)
        // console.log(usuario)
        // console.log(Object.keys(usuario.toJSON()))
        if(usuario){
            res.status(200).json({
                usuario
            })
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`No existen usuarios con id ${id}`})
        }
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    }

})

router.post('/',async(req, res)=>{
    let {nombre, email, apellido, password}=req.body
    if(!nombre || !email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Faltan datos: nombre, password y email son obligatorios...!!!`})
    }

    // let usuarios=usuariosManager.getUsuarios()

    // let existe=usuarios.find(u=>u.email===email)
    let existe=await usuariosManager.getUsuarioByEmail(email)    
    if(existe){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`El usuario con email ${email} ya existe en BD...!!!`})
    }

    password=creaHash(password)

    try {
        let nuevoUsuario=await usuariosManager.addUsuario({nombre, email, apellido, password})
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

router.put('/:id',async(req,res)=>{
    let {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Id invalido`})
    }

    let aModificar=req.body
    if(aModificar._id){
        delete aModificar._id
    }

    if(aModificar.email){
        let existe=await usuariosManager.getUsuarioBy({email:aModificar.email, _id:{$ne:id}})
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ya existe un usuarios con email ${aModificar.email}`})
        }
    }

    if(aModificar.password){
        aModificar.password=creaHash(aModificar.password)
    }

    try {
        let resultado=await usuariosManager.update(id, aModificar)
        if(resultado.modifiedCount>0){
            res.status(200).json({
                message:`Usuario modificado con id ${id}`
            })
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`No existen usuarios con id ${id}`})
        }
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    }

})

router.delete('/:id',async(req,res)=>{
    let {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Id invalido`})
    }

    try {
        let resultado=await usuariosManager.delete(id)
        if(resultado.deletedCount>0){
            res.status(200).json({
                message:`Usuario eliminado con id ${id}`
            })
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`No existen usuarios con id ${id}`})
        }
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    }

})