import mongoose from "mongoose"


export const heroesModelo=mongoose.model(
    "heroes", 
    new mongoose.Schema(
        {
            name: {type: String, unique:true, required:true },
        },
        {
            timestamps: true
        }
    )
)