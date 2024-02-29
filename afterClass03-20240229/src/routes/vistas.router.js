const CursosManager = require('../classes/CursosManager');
const { rutaCursos } = require('../utils');

const Router=require('express').Router;
const router=Router()

const cursosManager=new CursosManager(rutaCursos)

router.get('/',(req,res)=>{

    res.status(200).render("home")    
})

router.get('/inscripcion',async(req,res)=>{

    let cursos=await cursosManager.get()

    res.status(200).render("inscripcion",
    {
        cursos, alumno:{nombre:"Felipe", id:23}
    })    
})


module.exports=router