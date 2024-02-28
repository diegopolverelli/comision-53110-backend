import { Router } from 'express';
export const router=Router()

router.get('/pruebas',(req,res)=>{

    res.status(200).render("pruebas")
})

