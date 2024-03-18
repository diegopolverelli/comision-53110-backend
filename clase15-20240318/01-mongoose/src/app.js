import express from 'express';
import mongoose from 'mongoose';
import {engine} from "express-handlebars"
import {join} from "path"
import __dirname from './utils.js';
import { router as usuariosRouter} from './routes/usuarios.router.js';
import { router as vistasRouter } from './routes/vistas.router.js';
import { router as mascotasRouter } from './routes/mascotas.router.js';

const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.engine("handlebars", engine({
//     runtimeOptions: {
//         allowProtoPropertiesByDefault: true,
//         allowProtoMethodsByDefault: true,
//     },
// }))
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", join(__dirname, "views"))

// app.get('/',(req,res)=>{
//     res.setHeader('Content-Type','text/plain');
//     res.status(200).send('OK');
// })

app.use("/api/mascotas", mascotasRouter)
app.use('/api/usuarios',usuariosRouter)
app.use("/", vistasRouter)

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

const connect=async()=>{
    try {
        // await mongoose.connect("mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase14")
        await mongoose.connect("mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{dbName:"clase14"})
        console.log("DB Online...!!!")
    } catch (error) {
        console.log("Fallo conexión. Detalle:", error.message)
    }
}
connect()

