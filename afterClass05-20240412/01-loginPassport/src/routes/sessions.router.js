import { Router } from 'express';
import passport from 'passport';
export const router=Router()

router.get("/error", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(500).json(
        {
            error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
        }
    )
    
})

router.post('/registro', passport.authenticate("registro", {failureRedirect:"/api/sessions/error"}), (req,res)=>{

    // req.user 

    res.setHeader('Content-Type','application/json')
    res.status(200).json({msg:"registro exitoso", usuario: req.user})
})

router.post('/login', passport.authenticate("login",{failureRedirect:"/api/sessions/error"}), (req,res)=>{

    req.session.usuario=req.user

    res.setHeader('Content-Type','application/json')
    res.status(200).json({msg:"login correcto", usuario:req.user})
})

router.get("/github", passport.authenticate("github", {}), (req, res)=>{})

router.get("/callbackGithub", passport.authenticate("github", {failureRedirect:"/api/sessions/error"}), (req, res)=>{

    res.setHeader('Content-Type','application/json')
    res.status(200).json({msg:"Login correcto...!!!", usuario: req.user})    
})

router.get("/logout", (req, res)=>{
    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${e.message}`
                }
            )
        }
    })

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Logout exitoso"});
})