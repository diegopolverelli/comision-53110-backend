import { Router } from 'express';
export const router=Router()

let nombres=[]

router.get('/',(req,res)=>{

    

    res.setHeader('Content-Type','application/json')
    res.status(200).json({nombres})
})

router.post("/", (req, res)=>{
    let {nombre}=req.body

    nombres.push(nombre)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({nombreAgregado:nombre, nombres});
})