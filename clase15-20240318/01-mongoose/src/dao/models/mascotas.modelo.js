import mongoose from "mongoose"

const mascotasColl="mascotas"
const mascotasEsquema=new mongoose.Schema(
    {
        nombre: {type:String, required:true},
        especie: {type:String, required:true},
    },
    {
        timestamps:true
    }
)

export const mascotasModelo=mongoose.model(mascotasColl, mascotasEsquema)