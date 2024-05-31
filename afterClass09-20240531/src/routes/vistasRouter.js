import { Router } from 'express';
import { ProductosDAO } from '../dao/productosDAO.js';
import { passportCall } from '../utils.js';
import { CarritosDAO } from '../dao/CarritosDAO.js';
export const router=Router()

const productosDAO=new ProductosDAO()
const carritosDAO=new CarritosDAO()

router.get('/',(req,res)=>{

    res.setHeader('Content-Type','text/html')
    res.status(200).render("home")
})

router.get('/carrito', passportCall("current"),async(req,res)=>{

    let carrito=await carritosDAO.getOneByPopulate({_id:req.user.carrito})
    console.log(carrito)
    // let conStock=[]
    // let sinStock=[]
    // carrito.productos.forEach()

    res.setHeader('Content-Type','text/html')
    res.status(200).render("carrito", {usuario: req.user, carrito})
})

router.get('/login',(req,res)=>{

    res.setHeader('Content-Type','text/html')
    res.status(200).render("login")
})

router.get('/productos', passportCall("current"), async(req,res)=>{

    let productos=await productosDAO.getAll()
    // console.log(productos)


    // let usuario={
    //     nombre: "Matilde", carrito: "663d87fa33121106f9eb11a4"
    // }
    let usuario=req.user

    res.setHeader('Content-Type','text/html')
    res.status(200).render("productos",{
        productos, usuario
    })
})