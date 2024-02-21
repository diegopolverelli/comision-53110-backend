import {Router} from 'express'
import path from 'path'
import fs from 'fs'
import __dirname from '../utils.js'

// import express from 'express'
// export const router=express.Router()

export const router=Router()

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

router.get("/", (req, res)=>{

    let usuarios=getUsers()

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({usuarios});

})

router.get("/:id", (req, res)=>{

    let id=Number(req.params.id) // porque el id de mi DB es numérico... no siempre se hacer la transform...
    if(isNaN(id)){
        return res.status(400).json({error:"id debe ser numérico"})
    }

    let usuarios=getUsers()
    let usuario=usuarios.find(u=>u.id===id)
    if(!usuario){
        return res.status(400).json({error:`No existen usuarios con id ${id}`})
    }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({usuario});

})

router.post("/",(req, res)=>{

    if(!req.body.nombre){
        return res.status(400).json({
            error:"Complete el nombre"
        })
    }
    console.log(req.body)

    // validaciones... 
    let usuarios=getUsers()

    // asignar id...
    let id=1
    if(usuarios.length>0){
        id=Math.max(...usuarios.map(d=>d.id))+1
    }
    
    let nuevoUsuario={
        id, 
        ...req.body
    }
    

    usuarios.push(nuevoUsuario)

    saveUsers(usuarios)

    // usuariosManger.create()

    res.status(201).json({nuevoUsuario})
})


router.put("/:id", (req, res)=>{

    let id=Number(req.params.id) // porque el id de mi DB es numérico... no siempre se hacer la transform...
    if(isNaN(id)){
        return res.status(400).json({error:"id debe ser numérico"})
    }

    let usuarios=getUsers()
    let indiceUsuario=usuarios.findIndex(u=>u.id===id)
    if(indiceUsuario===-1){
        return res.status(400).json({error:`No existen usuarios con id ${id}`})
    }

    usuarios[indiceUsuario]={
        ...usuarios[indiceUsuario],
        ...req.body,
        id
    }

    saveUsers(usuarios)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({usuarioModificado:usuarios[indiceUsuario]});

})


router.delete("/:id", (req, res)=>{

    let id=Number(req.params.id) // porque el id de mi DB es numérico... no siempre se hacer la transform...
    if(isNaN(id)){
        return res.status(400).json({error:"id debe ser numérico"})
    }

    let usuarios=getUsers()
    let indiceUsuario=usuarios.findIndex(u=>u.id===id)
    if(indiceUsuario===-1){
        return res.status(400).json({error:`No existen usuarios con id ${id}`})
    }

    let usuarioEliminado=usuarios[indiceUsuario]
    usuarios.splice(indiceUsuario, 1)

    saveUsers(usuarios)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({usuarioEliminado});

})




