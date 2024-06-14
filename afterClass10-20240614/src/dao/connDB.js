import mongoose from "mongoose";
import { config } from "../config/config.js";
// import { productosModelo } from "./models/productos.model.js";

export let connDB
try {
    // console.log(config.db.MONGO_URL)
    // console.log(config.db.DB_NAME)
    await mongoose.connect(config.db.MONGO_URL, {dbName: config.db.DB_NAME})
    console.log(`DB conectada...!!!`)

    // let producto=await productosModelo.create({descripcion:"Tornillos", codigo:"h00010", precio:210, stock: 100})
    // console.log(producto)
} catch (error) {
    console.log(`Error al conectar a DB: ${error.message}`)
}