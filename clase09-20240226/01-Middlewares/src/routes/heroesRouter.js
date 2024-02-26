import { Router } from 'express';
import { HeroesManager } from '../classes/HeroesManager.js';
export const router=Router()

let heroesManager=new HeroesManager()

router.use((req,res,next)=>{
    console.log(`Pasó x middleware nivel router`)
    next()
})

router.get('/',(req,res)=>{

    let heroes=heroesManager.getHeroes()

    res.status(200).json({heroes})
})