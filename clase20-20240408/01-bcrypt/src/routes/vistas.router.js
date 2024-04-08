import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
export const router=Router()

router.get('/',(req,res)=>{

    res.status(200).render('home', {login:req.session.usuario})
})

router.get('/registro',(req,res)=>{

    let {error, mensaje} = req.query

    res.status(200).render('registro', {error, mensaje, login:req.session.usuario})
})

router.get('/login',(req,res)=>{

    res.status(200).render('login', {login:req.session.usuario})
})

router.get('/perfil', auth, (req,res)=>{

    let usuario=req.session.usuario

    res.status(200).render('perfil', {usuario, login:req.session.usuario})
})
