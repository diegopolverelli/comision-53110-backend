import dotenv from "dotenv"
import {Command, Option} from "commander"

let programa=new Command()

programa.addOption(new Option("-m --mode <MODE>", "Modo de ejecución del Script").choices(["dev", "prod"]).default("dev"))

programa.parse()
const opts=programa.opts()

const mode=opts.mode
dotenv.config(
    {
        path:mode==="prod"?"./src/.env.prod":"./src/.env.dev", 
        override: true
    }
)

export const config={
    PORT:process.env.PORT || 3000,
    MENSAJE:process.env.MENSAJE,
    MONGO_URL:process.env.MONGO_URL,
    DB_NAME:process.env.DB_NAME || "basePruebas",
    PRUEBA_PORT:process.env.PRUEBA_PORT
}