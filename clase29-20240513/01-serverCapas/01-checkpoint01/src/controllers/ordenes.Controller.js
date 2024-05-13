import { isValidObjectId } from "mongoose";

export const getOrdenes=async(req, res)=>{

    let ordenes="datos todas las ordenes de pedido"

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({ordenes});
}

export const createOrden=async(req, res)=>{

    let {uid, nid, pedido}=req.body  // pedido: [{id, cantidad}, {id, cantidad}]
    if(!uid || !nid || !Array.isArray(pedido)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete uid / nid / pedido, con formatos válidos`})
    }

    if(!isValidObjectId(uid) || !isValidObjectId(nid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingrese uid / nid con formato válido de mongodb`})
    }

    // validar existencia del usuario / negocio

    // validar que ítems del pedido existan como productos en el negocio
    // y completar datos del pedido (descrip, precio, subtotal)

    // calcular total, generar numero de orden

    // grabar en DB
    let nuevaOrden=`Nueva orden generada para ${uid}, negocio: ${nid}`
    res.setHeader('Content-Type','application/json');
    return res.status(201).json({mensaje:"Orden generada...!!!", nuevaOrden});


}