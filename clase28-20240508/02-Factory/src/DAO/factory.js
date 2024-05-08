// import mongoose from "mongoose";
import { config } from "../config/config.js";
export let DAO

// await mongoose.connect()

switch (config.PERSISTENCE) {
    case "MONGO":
        await import("./connDB.js")
        DAO=(await import("./usuariosMongoDAO.js")).usuariosMongoDAO
        // const {usuariosMongoDAO}=await import("./usuariosMongoDAO.js")
        // DAO=usuariosMongoDAO

        // const {default:usuariosMongoDAO}=await import("./usuariosMongoDAO.js")
        // DAO=usuariosMongoDAO

        break;

    case "FS":
        DAO=(await import("./usuariosFsDAO.js")).usuariosFsDAO
        break;

    default:
        console.log(`Persistencia mal configurada...!!!`)
        process.exit()
        break;
}