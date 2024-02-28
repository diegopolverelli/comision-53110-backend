import { Router } from 'express';
import { DemonSlayerManager } from '../classes/DemonSlayer.js';
import __dirname, { rutaDemon } from "../utils.js"
export const router=Router()

let demonSlayer=new DemonSlayerManager(rutaDemon)

router.get('/',async(req,res)=>{

    let personajes=await demonSlayer.getPersonajes()    

    res.setHeader('Content-Type','application/json')
    res.status(200).json({personajes})
})

router.post("/", async(req,res)=>{
    let personaje=req.body
    if(!personaje.name){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete propiedad name`})
    }

    let nuevoPersonaje=await demonSlayer.create(personaje)
    req.serverSocket.emit("nuevoPersonaje", nuevoPersonaje)

    res.setHeader('Content-Type','application/json');
    return res.status(201).json({nuevoPersonaje});
})