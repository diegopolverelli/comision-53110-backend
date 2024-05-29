import __dirname, { logger, middLogg } from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';

import { router as vistasRouter } from './routes/vistasRouter.js';
import { router as heroesRouter } from './routes/heroesRouter.js';

const PORT=3000;

const app=express();

app.use(middLogg)
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/public')));

app.use('/', vistasRouter)
app.use('/api/heroes', heroesRouter)

app.get("/prueba1", async(req, res)=>{

    console.log(fafafa)
    
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload: "prueba1...!!!"});
})


process.on("unhandledRejection", (error)=>{
    logger.error(error.message)
})


const server=app.listen(PORT,()=>{
    // console.log(`Server escuchando en puerto ${PORT}`);
    logger.info(`Server escuchando en puerto ${PORT}`)
    logger.debug(`Server escuchando en puerto ${PORT}`)
});
