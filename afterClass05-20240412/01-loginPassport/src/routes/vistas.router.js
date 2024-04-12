import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
export const router=Router()

router.get('/',(req,res)=>{
    

    res.setHeader('Content-Type','text/html')
    res.status(200).render("inicio",{})
})

router.get('/perfil', auth,(req,res)=>{
    

    res.setHeader('Content-Type','text/html')
    res.status(200).render("perfil",{})
})