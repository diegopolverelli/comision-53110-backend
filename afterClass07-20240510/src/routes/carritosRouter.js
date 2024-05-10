import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import { CarritosDAO } from '../dao/CarritosDAO.js';
import { ProductosDAO } from '../dao/productosDAO.js';
export const router=Router()

const carritosDAO=new CarritosDAO()
const productosDAO=new ProductosDAO()

router.get("/:cid", async(req, res)=>{
    let {cid}=req.params
    if(!cid){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingrese cid`})
    }

    if(!isValidObjectId(cid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingrese cidcon formato válido de MongoDB id`})
    }

    let carrito=await carritosDAO.getOneByPopulate({_id:cid})
    if(!carrito){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Carrito inexistente: ${cid}`})
    } 

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({carrito});

})

router.put('/:cid/producto/:pid',async(req,res)=>{

    let {cid, pid}=req.params
    if(!cid || !pid){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingrese cid y pid`})
    }

    if(!isValidObjectId(cid) || !isValidObjectId(pid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingrese cid / pid con formato válido de MongoDB id`})
    }

    let carrito=await carritosDAO.getOneBy({_id:cid})
    if(!carrito){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Carrito inexistente: ${cid}`})
    }

    let producto=await productosDAO.getOneBy({_id:pid})
    if(!producto){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Producto inexistente: ${pid}`})
    }

    let indiceProducto=carrito.productos.findIndex(p=>p.producto==pid)
    if(indiceProducto===-1){
        carrito.productos.push({
            producto: pid, cantidad: 1
        })
    }else{
        carrito.productos[indiceProducto].cantidad++
    }

    try {
        let resultado=await carritosDAO.update(cid, carrito)
        if(resultado.modifiedCount>0){
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:"Carrito actualizado...!!!"});
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                }
            )
        }
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

    res.setHeader('Content-Type','application/json')
    res.status(200).json({})
})