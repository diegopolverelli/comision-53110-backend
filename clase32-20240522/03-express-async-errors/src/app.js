import express from 'express';
import { router as heroesRouter } from './routes/heroesRouter.js';
import { handleError } from './middleware/handleErrors.js';
import CustomError from './utils/CustomError.js';
import { ERRORES } from './utils/EErrores.js';
import "express-async-errors"

const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/heroes', heroesRouter)


app.get('/',(req,res)=>{

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/error',(req,res)=>{

    throw new Error("Error de prueba")

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/error2',(req,res)=>{

    CustomError.createError({name:"Error de prueba", cause:"Estamos probando errores", message:"Prueba Errores", code: ERRORES.INDETERMINADO})

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/error3',async(req,res)=>{

    CustomError.createError({name:"Error de prueba", cause:"Estamos probando errores", message:"Prueba Errores", code: ERRORES.INDETERMINADO})

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.use(handleError)

process.on("unhandledRejection", (error, promesa)=>{
    console.log(promesa)
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
