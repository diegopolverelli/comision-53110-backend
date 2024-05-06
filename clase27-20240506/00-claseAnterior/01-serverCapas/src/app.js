import express from 'express';
import { router as usuariosRouter } from './router/usuarios.router.js';
import { router as heroesRouter } from './router/heroes.router.js';
import mongoose from 'mongoose';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/usuarios", usuariosRouter)
app.use("/api/heroes", heroesRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});


const connDB=async ()=>{
    try {
        await mongoose.connect("mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase26")
        console.log("DB Online...!!!")
    } catch (error) {
        console.log(error.message)
    }
}

connDB()