import mongoose from "mongoose";

export const productosModelo=mongoose.model(
    "productos",
    new mongoose.Schema(
        {
            descripcion: String, 
            codigo:{
                type: String, unique: true
            },
            precio: Number,
            stock: Number
        },
        {
            timestamps:true
        }
    )
)