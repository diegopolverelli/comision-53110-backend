import express from 'express';
import { router as heroesRouter } from './routes/heroesRouter.js';
import { handleError } from './middleware/handleErrors.js';
import CustomError from './utils/CustomError.js';
import { ERRORES } from './utils/EErrores.js';

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

app.get('/error3',async(req,res,next)=>{

    try {
        CustomError.createError({name:"Error de prueba", cause:"Estamos probando errores", message:"Prueba Errores", code: ERRORES.INDETERMINADO})
        
    } catch (error) {
        // res.setHeader('Content-Type','application/json');
        // return res.status(400).json({error:`error...!!!`})
        return next(error)
    }

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const f1=async()=>{

    console.log(adofiaspodfiu)

    return "ok...!!!"
}

app.get('/error4',async(req,res,next)=>{

    let resultado
    try {
        resultado=f1()
    } catch (error) {
        return next(error)        
    }

    res.setHeader('Content-Type','text/plain');
    res.status(200).send(resultado);
})

process.on("unhandledRejection", (error, promise)=>{
    console.log(promise)
})

app.use(handleError)

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
