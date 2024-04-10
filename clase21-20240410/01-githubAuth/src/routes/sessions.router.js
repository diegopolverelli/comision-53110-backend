import { Router } from 'express';
import passport from 'passport';
export const router=Router()

router.get('/github', passport.authenticate("github", {}), (req,res)=>{})

router.get('/callbackGithub', passport.authenticate("github", {failureRedirect:"/api/sessions/errorGitHub"}), (req,res)=>{

    // req.user

    req.session.usuario=req.user
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({
        payload:"Login correcto", 
        usuario:req.user
    });
})

router.get("/errorGitHub", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(500).json(
        {
            error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle:`Fallo al autenticar con GitHub`
        }
    )
    
})