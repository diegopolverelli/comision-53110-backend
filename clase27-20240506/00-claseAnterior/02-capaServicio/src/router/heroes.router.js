import { Router } from 'express';
import { createHeroes, getAllHeroes } from '../controller/heroes.controller.js';
export const router=Router()

router.get('/', getAllHeroes)
router.post("/", createHeroes)

// router.get('/', passportCall("jwt"), async(req, res)=>{
//     let heroes=await heroesManger.getAll()
//     res.setHeader('Content-Type','application/json');
//     return res.status(200).json({payload:heroes});
// })

// router.get('/', passportCall("jwt"), getAllHeroes)
