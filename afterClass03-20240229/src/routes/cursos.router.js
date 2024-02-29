const CursosManager = require('../classes/CursosManager');
const { rutaCursos } = require('../utils');

const Router=require('express').Router;
const router=Router()

const cursosManager=new CursosManager(rutaCursos)

router.post('/',async(req,res)=>{

    let {descrip}=req.body
    if(!descrip){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete descrip del curso...!!!`})
    }

    // validar curso descrip no repetido...

    let nuevoCurso=await cursosManager.create({descrip})   
    if(!nuevoCurso){
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`})
    }
    req.io.emit("nuevoCurso", nuevoCurso)

    res.setHeader('Content-Type','application/json')
    res.status(201).json({nuevoCurso})
})


module.exports=router