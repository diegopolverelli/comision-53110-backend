import express from 'express';
import __dirname from './utils.js'
import path from "path"

import handlebars from "express-handlebars"

const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.get('/',(req,res)=>{
    // res.setHeader('Content-Type','text/plain');
    // res.status(200).send('OK');
    res.status(200).render("inicio")
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
