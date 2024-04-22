import express from 'express';
import { HeroesRouter } from './routes/heroesRouter.js';
import { router as sessionsRouter } from './routes/sessionsRouter.js';
import { router as pruebasRouter } from './routes/routerPruebas.js';
const PORT=3000;

const app=express();
const heroesRouter=new HeroesRouter()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/pruebas", pruebasRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/api/heroes", heroesRouter.getRouter())

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
