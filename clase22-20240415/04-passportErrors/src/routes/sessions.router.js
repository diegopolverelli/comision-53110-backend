import { Router } from 'express';
import fs from 'fs'
import jwt from "jsonwebtoken"
import { SECRET, passportCall } from '../utils.js';
import { auth } from '../middleware/auth.js';
import passport from 'passport';

export const router=Router()

let usuarios=[]
if(fs.existsSync('./src/usuarios.json')){
    usuarios=JSON.parse(fs.readFileSync('./src/usuarios.json','utf-8'))
}

router.post('/registro',(req,res)=>{
    let {nombre, email, password}=req.body
    if(!nombre || !email || !password) return res.status(400).send('Ingrese todos los datos')

    let usuario=usuarios.find(u=>u.email===email)
    if(usuario) return res.status(400).send(`El usuario ${email} ya existe en la DB`)

    let id=1
    if(usuarios.length>0) id=usuarios[usuarios.length-1].id+1

    usuario={
        id, nombre, email, password
    }

    usuarios.push(usuario)

    fs.writeFileSync('./src/usuarios.json',JSON.stringify(usuarios,null,5))

    res.json({
        usuarioCreado:usuario
    })
})

router.post('/login',(req,res)=>{
    let {email, password}=req.body
    if(!email || !password) return res.status(400).send('Ingrese email y password')

    usuarios=JSON.parse(fs.readFileSync('./src/usuarios.json','utf8'))

    let usuario=usuarios.find(u=>u.email===email && u.password===password)
    if(!usuario) return res.status(400).send(`Error credenciales`)

    usuario={...usuario}
    delete usuario.password
    // let token=jwt.sign(usuario, SECRET, {expiresIn:"1h"})
    let token=jwt.sign(usuario, SECRET, {expiresIn:5})

    res.cookie("coderCookie", token, {maxAge: 1000*60*60, signed:true, httpOnly: true})

    return res.status(200).json({
        usuarioLogueado:usuario, 
        // token
    })

})

// router.get('/usuario', auth, (req,res)=>{
// router.get('/usuario', passport.authenticate("jwt", {session:false}), (req,res)=>{
router.get('/usuario', passportCall("jwt"), (req,res)=>{


    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        mensaje:'Perfil usuario',
        datosUsuario: req.user
    });
});

// router.get('/protected', function(req, res, next) {
//     passport.authenticate('local', function(err, user, info, status) {
//       if (err) { return next(err) }
//       if (!user) { return res.redirect('/signin') }
//       res.redirect('/account');
//     })(req, res, next);
//   });
