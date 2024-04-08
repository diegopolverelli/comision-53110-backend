import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';
import session from "express-session"
import { inicializaPassport } from './config/passport.config.js';
import passport from 'passport';

import { router as sessionsRouter } from './routes/sessions.router.js';
import { router as vistasRouter } from './routes/vistas.router.js';

const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session(
    {
        secret:"CoderCoder123",
        resave: true, saveUninitialized: true
    }
))

// 2) inicializo passport y sus configuraciones en el app.js
inicializaPassport()
app.use(passport.initialize())
app.use(passport.session()) // solo si estamos usando Sesiones

app.use(express.static("./src/public"))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use("/api/sessions", sessionsRouter)
app.use('/', vistasRouter)

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

const conectar=async()=>{
    try {
        await mongoose.connect("mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase20")
        console.log(`Conexión a DB establecida`)
    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err}`)
    }
}

conectar();
