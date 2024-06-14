import { Router } from 'express';
import passport from 'passport';
import jwt from "jsonwebtoken"
import { passportCall } from '../utils.js';
import { config } from '../config/config.js';
export const router=Router()

router.post('/registro', passportCall("registro"), (req,res)=>{
    

    res.setHeader('Content-Type','application/json')
    res.status(200).json({status: `Usuario creado: ${req.user.nombre}`, nuevoUsuario: req.user})
})

router.post("/login", passportCall("login"), (req, res)=>{

    let token=jwt.sign(req.user, config.general.SECRET, {expiresIn:"1h"})
    res.cookie("coderCookie", token)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Login exitoso...!!!", usuarioLogueado:req.user});
})