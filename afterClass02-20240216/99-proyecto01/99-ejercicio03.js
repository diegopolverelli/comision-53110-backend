const express=require("express")
const UsuariosManager=require('./99-Usuarios')

const PORT=3000
const app=express()

const um=new UsuariosManager("./usuarios.json")

app.get("/usuarios",async(req, res)=>{
    let usuarios
    try {
        usuarios=await um.getUsers()
    } catch (error) {
        console.log(error.message)
    }
    // console.log(usuarios)

    // um.getUsers()
    // .then()

    res.json(usuarios)
})


app.listen(PORT, ()=>{
    console.log(`Server ON LINE en puerto ${PORT}`)
})