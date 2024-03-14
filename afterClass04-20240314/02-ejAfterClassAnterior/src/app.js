const path=require('path');
const express=require('express');
const {Server}=require("socket.io")

// const engine=require('express-handlebars').engine
const handlebars=require("express-handlebars")

const vistasRouter=require("./routes/vistas.router")
const cursosRouter=require("./routes/cursos.router");
const { rutaAlumnos } = require('./utils');
const AlumnosManager = require('./classes/AlumnosManager');

const PORT=3000;
let io;

const app=express();

// app.engine('handlebars', engine());
app.engine("handlebars", handlebars.engine())
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'/public')));


app.use("/api/cursos", (req, res, next)=>{
    req.io=io
    next()
}, cursosRouter)
app.use("/", vistasRouter)

app.post("/prueba/:id/:descrip",(req,res)=>{
    console.log(req.params)

    res.status(200).json({mensaje:"prueba inscripcion correcta...!!!"})
})

app.get('*',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(404).send('error 404 - page not found');
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

io=new Server(server) // server de websockets

const alumnosManager=new AlumnosManager

io.on("connection",socket=>{
    console.log(`se conecto un cliente ${socket.id}`)

    socket.on("inscripcion", (idCurso, descrip, idAlumno)=>{
        alumnosManager.inscribir(idAlumno, idCurso, descrip)
    })
})
