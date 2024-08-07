import mongoose from "mongoose";

export const usuariosModelo=mongoose.model(
    "usuarios",
    new mongoose.Schema(
        {
            nombre: String, 
            email:{
                type: String, unique: true
            },
            password: String,
            carrito: {
                type: mongoose.Types.ObjectId, ref: "carritos"
            },
            rol: {type: String, default: "user"}
        },
        {
            timestamps:true
        }
    )
)