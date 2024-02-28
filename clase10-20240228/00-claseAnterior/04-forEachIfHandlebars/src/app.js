import express from 'express';
import __dirname from './utils.js'
import path from "path"
import handlebars from "express-handlebars"
import { router as heroesRouter } from './routes/heroesRouter.js';
import { router as vistasRouter } from './routes/vistasRouter.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")))

app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))



app.use('/api/heroes', heroesRouter)
app.use("/", vistasRouter)

// app.get('/',(req,res)=>{

//     res.setHeader('Content-Type','text/plain');
//     res.status(200).send('OK');
// })

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
