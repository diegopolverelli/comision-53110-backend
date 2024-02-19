import express from 'express';
import path from 'path'
import fs from 'fs'

import __dirname from './utils.js'

const PORT=3000;

const app=express();

let ruta=path.join(__dirname,'data','usuarios.json') 

function getUsers(){
    if(fs.existsSync(ruta)){
        return JSON.parse(fs.readFileSync(ruta,'utf-8'))
    }else{
        return []
    }
}

function saveUsers(users){
    fs.writeFileSync(ruta, JSON.stringify(users, null, 5))    
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get("/api/usuarios", (req, res)=>{

    let usuarios=getUsers()

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({usuarios});

})

app.post("/api/usuarios",(req, res)=>{

    console.log(req.body)

    // validaciones... 
    let usuarios=getUsers()

    // asignar id...

    usuarios.push(req.body)

    saveUsers(usuarios)

    // usuariosManger.create()

    res.status(201).json({mensaje:req.body})
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
