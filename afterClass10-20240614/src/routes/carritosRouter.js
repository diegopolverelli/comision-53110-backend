import { Router } from 'express';
import mongoose from 'mongoose';
import { isValidObjectId } from 'mongoose';
import { CarritosDAO } from '../dao/CarritosDAO.js';
import { ProductosDAO } from '../dao/productosDAO.js';
import { enviarMail, passportCall } from '../utils.js';
import { TicketsDAO } from '../dao/TicketsDAO.js';
export const router=Router()

const carritosDAO=new CarritosDAO()
const productosDAO=new ProductosDAO()
const ticketsDAO=new TicketsDAO()

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
    
    if(producto.stock<=0){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No hay stock para el producto: ${pid}`})
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

router.get("/comprar/:cid", passportCall("current"), async(req, res)=>{
    let {cid}=req.params
    if(!isValidObjectId(cid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Se ha ingresado un id de carrito inválido`})
    }

    let carrito=await carritosDAO.getOneBy({_id: cid})
    if(!carrito){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Carrito inexistente. Id: ${cid}`})
    }

    if(carrito.productos.length===0){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Carrito vacío...!!!`})
    }

    try {
        let conStock=[]
        let sinStock=[]
        let total=0
        // console.log(JSON.stringify(carrito.productos,null, 5))
        for(let i=0; i<carrito.productos.length; i++){
            // let pid=carrito.productos[i]._id
            let pid=carrito.productos[i].producto
            let cantidad=carrito.productos[i].cantidad
            let producto=await productosDAO.getOneBy({_id: pid})
            if(!producto || producto.stock-cantidad<0){
                sinStock.push(
                    {
                        producto: pid, cantidad
                    }
                )
            }else{
                conStock.push(
                    {
                        _id: pid, 
                        descripcion: producto.descripcion,
                        cantidad, 
                        precio: producto.precio, 
                        subtotal: producto.precio*cantidad,
                        stockPrevioCompra: producto.stock
                    }
                )
                producto.stock=producto.stock-cantidad
                await productosDAO.update(pid, producto)
                total+=cantidad*producto.precio
            }
        }

        // console.log({sinStock})
        // console.log({conStock})
        // console.log({total})
        if(conStock.length===0){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`No hay ítems en condiciones de ser facturados (verificar stock / existencia del producto)`})
        }
        let nroComp=Date.now()
        let fecha=new Date()
        let email=req.user.email

        let nuevoTicket=await ticketsDAO.create(
            {
                nroComp, fecha, email, 
                items: conStock, total
            }
        )

        carrito.productos=sinStock
        await carritosDAO.update(cid, carrito)

        let mensaje=`Su compra ha sido procesada...!!! <br>
Ticket: <b>${nroComp}</b> - importe a pagar: <b><i>$ ${total}</b></i> <br>
Contacte a pagos para finalizar la operación: pagos@cuchuflito.com
<br><br>
${sinStock.length>0?`Algunos items del carrito no fueron procesados. Verifique: ${JSON.stringify(sinStock, null, 5)}`:""}`

        enviarMail(email, "Compra realizada con éxito...!!!", mensaje)
        
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({nuevoTicket});
    
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