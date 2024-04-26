import mongoose from "mongoose";

export const rolModelo=mongoose.model(
    "roles",
    new mongoose.Schema(
        {
            descrip:String
        },
        {timestamps:true, collection: "roles"}
    )
)