const AlumnosManager = require('../classes/AlumnosManager');
const CursosManager = require('../classes/CursosManager');
const { rutaCursos, rutaAlumnos } = require('../utils');

const Router=require('express').Router;
const router=Router()

const cursosManager=new CursosManager(rutaCursos)
const alumnosManager=new AlumnosManager(rutaAlumnos)

router.get('/',async(req,res)=>{

    let alumnos=await alumnosManager.get()

    res.status(200).render("home", {alumnos})    
})

router.get('/inscripcion',async(req,res)=>{

    let {idAlumno}=req.query
    if(!idAlumno){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No recibimos alumnos...!!!`})
    }

    idAlumno=Number(idAlumno)
    if(isNaN(idAlumno)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`idAlumno formato incorrecto`})
    }

    let cursos=await cursosManager.get()
    let alumno=await alumnosManager.getById(idAlumno)

    res.status(200).render("inscripcion",
    {
        cursos, alumno
    })    
})


module.exports=router