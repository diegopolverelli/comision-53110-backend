import { Router } from 'express';
import jwt from "jsonwebtoken"
import { SECRET } from '../utils.js';
export const router=Router()

router.post('/login',(req,res)=>{

    let {email, password}=req.body
    if(!email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Faltan datos...!!!`})
    }

    let usuario=null
    if(email==="admin@test.com" && password==="123"){
        usuario={email, rol:"admin"}
    }

    if(email==="juan@test.com" && password==="123"){
        usuario={email, rol:"usuario"}
    }

    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales invalidas`})
    }

    let token=jwt.sign(usuario, SECRET, {expiresIn: 60*5})

    res.setHeader('Content-Type','application/json')
    res.status(200).json({
        status:"ok", usuario, token
    })
})