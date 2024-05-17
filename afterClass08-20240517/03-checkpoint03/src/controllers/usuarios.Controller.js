import mongoose, { isValidObjectId } from "mongoose"
import { UsuariosDAO } from "../dao/usuariosDAO.js"

const usuariosService=new UsuariosDAO()

export const getUsuarios=async(req,res)=>{

    // let usuarios="obtiene todos los usuarios"
    let usuarios=await usuariosService.getAll()
    
    res.setHeader('Content-Type','application/json')
    res.status(200).json({usuarios})
}

export const getUsuarioById=async(req,res)=>{

    let {uid}=req.params
    if(!isValidObjectId(uid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingrese un uid de mongodb válido`})
    }

    // validar existencia usuario...

    // let usuario=`Datos del usuario ${uid}`
    let usuario=await usuariosService.getBy({_id:uid})
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No existen usuarios con id ${uid}`})
    }else{
        res.setHeader('Content-Type','application/json')
        res.status(200).json({usuario})
    }
    
}

export const createUsuario=async(req, res)=>{
    let {nombre, email}=req.body
    if(!nombre || !email){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete nombre / email`})
    }

    // realizar validaciones varias...

    // validar existencia previa de email en DB...
    let existe=await usuariosService.getBy({email})
    if(existe){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ya existe en DB un usuario con email ${email}`})
    }

    // grabar en DB...
    try {
        let nuevoUsuario=await usuariosService.create({nombre, email})
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({mensaje:"Nuevo usuario creado", nuevoUsuario});
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
}