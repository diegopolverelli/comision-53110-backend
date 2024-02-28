import { Router } from 'express';
import { HeroesManager } from '../classes/HeroesManager.js';
import { rutaHeroes } from '../utils.js';
export const router=Router()

let heroesManager=new HeroesManager(rutaHeroes)  // "../data/heroes.json"

router.get('/',(req,res)=>{

    let heroes=heroesManager.getHeroes()

    res.status(200).json({heroes})
})