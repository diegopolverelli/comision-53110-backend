import mongoose from "mongoose";

export const carritosModelo=mongoose.model(
    "carritos",
    new mongoose.Schema(
        {
            productos:{
                type: [
                    {
                        producto: {
                            type: mongoose.Types.ObjectId, ref: "productos"
                        }, 
                        cantidad: Number
                    }
                ]
            }
        },
        {
            timestamps:true
        }
    )
)