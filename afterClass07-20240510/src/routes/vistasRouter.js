import { Router } from 'express';
import { ProductosDAO } from '../dao/productosDAO.js';
export const router=Router()

const productosDAO=new ProductosDAO()

router.get('/',(req,res)=>{

    res.setHeader('Content-Type','text/html')
    res.status(200).render("home")
})

router.get('/productos', async(req,res)=>{

    let productos=await productosDAO.getAll()
    // console.log(productos)

    let usuario={
        nombre: "Matilde", carrito: "663d87fa33121106f9eb11a4"
    }

    res.setHeader('Content-Type','text/html')
    res.status(200).render("productos",{
        productos, usuario
    })
})