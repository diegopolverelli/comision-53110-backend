import mongoose from "mongoose"
export const ticketModelo=mongoose.model(
    "tickets",
    new mongoose.Schema(
        {
            nroComp: String, 
            fecha: Date, 
            email: String, 
            items: Array, 
            total: Number
        },
        {
            timestamps: true
        }
    )
)