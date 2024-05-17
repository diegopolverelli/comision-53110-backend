import { isValidObjectId } from "mongoose";
import { OrdenesDAO } from "../dao/ordenesDAO.js";
import { UsuariosDAO } from "../dao/usuariosDAO.js";
import { NegociosDAO } from "../dao/negociosDAO.js";
import { usuariosModelo } from "../dao/models/usuarios.model.js";

const serviceOrdenes=new OrdenesDAO()
const serviceUsuarios=new UsuariosDAO()
const serviceNegocios=new NegociosDAO()

export const getOrdenes=async(req, res)=>{

    // let ordenes="datos todas las ordenes de pedido"
    let ordenes=await serviceOrdenes.getAll()

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
    let usuario=await serviceUsuarios.getBy({_id:uid})
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No existen usuarios con id ${uid}`})
    }

    let negocio=await serviceNegocios.getBy({_id:nid})
    if(!negocio){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No existen negocios con id ${nid}`})
    }

    // validar que ítems del pedido existan como productos en el negocio
    // y completar datos del pedido (descrip, precio, subtotal)
    let detalleErrores=[]
    let error=false
    pedido.forEach(item=>{
        let itemID=item.id
        let cantidad=item.cantidad
        let producto=negocio.productos.find(p=>p.id===itemID)
        if(!producto){
            error=true
            detalleErrores.push(`No existe un producto con id ${itemID} en el negocio ${negocio.nombre}`)
        }else{
            item.descrip=producto.descrip
            item.precio=producto.precio
            item.subtotal=producto.precio*cantidad
        }
    })

    if(error){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Se ingresó algún producto inválido`, detalleErrores})
    }

    console.log(pedido)
    
    // calcular total, generar numero de orden
    let total=pedido.reduce((acum, item)=>acum+=item.subtotal,0)
    console.log(total)
    let numero=Date.now()
    let fecha=new Date().toUTCString()

    // grabar en DB
    try {
        // let nuevaOrden=`Nueva orden generada para ${uid}, negocio: ${nid}`
        let nuevaOrden=await serviceOrdenes.create({numero, fecha, total, pedido, cliente:uid, negocio:nid})
        usuario.ordenes.push({
            orden: nuevaOrden._id
        })
        await serviceUsuarios.update(uid, usuario)
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({mensaje:"Orden generada...!!!", nuevaOrden});
        
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