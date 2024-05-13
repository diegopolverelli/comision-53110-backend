import mongoose, { isValidObjectId } from "mongoose"

export const getUsuarios=async(req,res)=>{

    let usuarios="obtiene todos los usuarios"
    
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

    let usuario=`Datos del usuario ${uid}`
    
    res.setHeader('Content-Type','application/json')
    res.status(200).json({usuario})
}

export const createUsuario=async(req, res)=>{
    let {nombre, email}=req.body
    if(!nombre || !email){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete nombre / email`})
    }

    // realizar validaciones varias...

    // validar existencia previa de email en DB...

    // grabar en DB...
    let nuevoUsuario=`Nuevo usuario creado: ${nombre}`
    res.setHeader('Content-Type','application/json');
    return res.status(201).json({mensaje:"Nuevo usuario creado", nuevoUsuario});
}