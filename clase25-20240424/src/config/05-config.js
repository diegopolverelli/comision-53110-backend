import dotenv from "dotenv"

const mode="dev"
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