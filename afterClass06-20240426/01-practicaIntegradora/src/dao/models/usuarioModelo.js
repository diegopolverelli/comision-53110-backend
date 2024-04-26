import mongoose from "mongoose";

export const usuarioModelo=mongoose.model(
    "usuarios",
    new mongoose.Schema(
        {
            nombre: String,
            email: {
                type: String, unique:true
            },
            password: String, 
            rol: {
                type: mongoose.Types.ObjectId,
                ref: "roles"
            }
        },
        {timestamps:true}
    )
)