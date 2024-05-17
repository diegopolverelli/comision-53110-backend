import { isValidObjectId } from "mongoose";
import { NegociosDAO } from "../dao/negociosDAO.js";

const negociosService=new NegociosDAO()

export const getNegocios=async(req, res)=>{

    // let negocios="obtiene todos los negocios"
    let negocios=await negociosService.getAll()

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({negocios});
}

export const getNegocioById=async(req, res)=>{

    let {nid}=req.params
    if(!isValidObjectId(nid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingrese un nid válido de mongodb`})
    }

    // let negocio=`Datos del negocio ${nid}`
    let negocio=await negociosService.getBy({_id:nid})
    if(!negocio){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No existen negocios con id ${nid}`})
    }
    
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
    let existe=await negociosService.getBy({nombre})
    if(existe){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ya existe otro negocio con nombre ${nombre}`})
    }

    // resto validaciones pertinentes...


    try {
        // let nuevoNegocio=`Negocio creado ${nombre}`
        let nuevoNegocio=await negociosService.create({nombre, productos})
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({mensaje: "Negocio creado...!!!", nuevoNegocio});
        
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