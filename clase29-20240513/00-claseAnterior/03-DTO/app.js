import mongoose from "mongoose";
import { UsuariosDTO } from "./UsuariosDTO.js";
const url="mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase14"

try {
    await mongoose.connect(url)
    console.log("DB conectada...!!!")
} catch (error) {
    console.log(`Error al conectar a DB: ${error.message}`)
}

const usuariosModelo=mongoose.model(
    "usuarios",
    new mongoose.Schema(
        {
            nombre:String, email:String, apellido:String
        }
    )
)

usuariosModelo.find().then(res=>{
    let usuarios=res.map(usuario=>new UsuariosDTO(usuario))
    console.log(usuarios)
    process.exit()
})