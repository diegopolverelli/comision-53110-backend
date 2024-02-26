import express from 'express';
import __dirname from './utils.js'
import { router as heroesRouter } from './routes/heroesRouter.js';
const PORT=3000;

const app=express();

const middleware01=(req, res, next)=>{
    console.log(`pasó x middleware01...!!! - ulr: ${req.url} - queryParams: ${JSON.stringify(req.query)} - fecha: ${new Date().toUTCString()}`)

    next()
}

const middleware02=(req, res, next)=>{
    console.log(`pasó x middleware02...!!!`)
    if(req.query.nombre){
        req.query.nombre=req.query.nombre.toUpperCase()
        if(req.query.nombre==="MARIANO"){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`El usuario Mariano tiene el acceso temporalmente inhabilitado`})
        }
    }

    req.codigoAgregado=1000

    next()
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(middleware01, middleware02, (req, res, next)=>{
    console.log(`middleware "online"...`)
    next()
})   // midd a nivel app

app.use('/api/heroes', heroesRouter)

app.get('/',(req,res)=>{

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/prueba', (req, res, next)=>{
    console.log(`Pasó x midd a nivel endpoint`)
    next()
}, (req,res)=>{  // midd nivel endpoint
   
    let {nombre, error}=req.query
    let {codigoAgregado}=req

    if(error){
        console.log(blablabla)
    }
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        mensaje:"ruta prueba", 
        nombre, 
        codigoAgregado
    });
});

app.use((error, req, res, next)=>{
    if(error){
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({
            error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle:error.message
        })
        
    }
    next()
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
