import { isValidObjectId } from "mongoose";

export const getNegocios=async(req, res)=>{

    let negocios="obtiene todos los negocios"

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({negocios});
}

export const getNegocioById=async(req, res)=>{

    let {nid}=req.params
    if(!isValidObjectId(nid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingrese un nid válido de mongodb`})
    }

    let negocio=`Datos del negocio ${nid}`

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({negocio});
}

export const createNegocio=async(req, res)=>{
    let {nombre, productos}=req.body
    if(!nombre || !productos || !Array.isArray(productos)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete nombre / productos en formato válido`})
    }

    // validar existencia nombre en DB

    // resto validaciones pertinentes...

    let nuevoNegocio=`Negocio creado ${nombre}`
    res.setHeader('Content-Type','application/json');
    return res.status(201).json({mensaje: "Negocio creado...!!!", nuevoNegocio});

}