import { Router } from 'express';
import { MascotasManagerMongo } from '../dao/MascotasManagerMongo.js';
export const router=Router()

let mascotasManager=new MascotasManagerMongo()

router.get('/',async(req,res)=>{

    let mascotas=await mascotasManager.getMascotas()

    res.setHeader('Content-Type','application/json')
    res.status(200).json(mascotas)
})