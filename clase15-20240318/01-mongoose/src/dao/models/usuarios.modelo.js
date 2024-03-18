import mongoose from "mongoose"

const usuariosColl="usuarios"
const usuariosSchema=new mongoose.Schema(
    {
        nombre: String,
        email: {
            type: String,
            required:true, 
            unique:true
        },
        apellido: String,
        password: String
    },
    {
        timestamps: true, strict:false
    }
)

export const modeloUsuarios=mongoose.model(usuariosColl, usuariosSchema)