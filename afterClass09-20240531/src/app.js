import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { inicioPassport } from './config/passport.config.js';
import {engine} from 'express-handlebars';

import { router as sessionsRouter } from './routes/sessions.router.js';
import { router as carritosRouter } from './routes/carritosRouter.js';
import { router as vistasRouter } from './routes/vistasRouter.js';
import { connDB } from './dao/connDB.js';

const PORT=3000;

const app=express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended:true}));
inicioPassport()
app.use(passport.initialize())

app.use(express.static(path.join(__dirname,'/public')));

app.use("/api/sessions", sessionsRouter)
app.use("/api/carritos", carritosRouter)
app.use("/", vistasRouter)

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
