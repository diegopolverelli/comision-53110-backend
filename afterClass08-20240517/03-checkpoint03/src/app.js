import express from 'express';
import { router as usuariosRouter } from './routes/usuarios.router.js';
import { router as negociosRouter } from './routes/negocios.router.js';
import { router as ordenesRouter } from './routes/ordenes.router.js';
import mongoose from 'mongoose';
import cors from "cors"

const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use("/api/usuarios", usuariosRouter)
app.use("/api/negocios", negociosRouter)
app.use("/api/ordenes", ordenesRouter)

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

try {
    await mongoose.connect("mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase29")
    console.log("DB conectada...!!!")
} catch (error) {
    console.log(`Error al conectar DB: ${error.message}`)
}
