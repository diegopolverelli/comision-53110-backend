import { Router } from 'express';
import { HeroesManager } from '../classes/HeroesManager.js';
import { rutaHeroes } from '../utils.js';
// import fs from "fs"
export const router=Router()

let heroesManager=new HeroesManager(rutaHeroes)

router.get('/',(req,res)=>{
    let {nombre}=req.query

    res.status(200).render("inicio", { nombre })
})

router.get('/heroes',(req,res)=>{

    // let heroes=fs.rea
    let heroes=heroesManager.getHeroes()

    res.status(200).render("heroes", {
        heroes
    })
})