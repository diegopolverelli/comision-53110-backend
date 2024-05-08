import dotenv from "dotenv"

dotenv.config(
    {
        override:true, path:"./src/.env"
    }
)

export const config={
    PORT:process.env.PORT||3000,
    MONGO_URL: process.env.MONGO_URL,
    PERSISTENCE: process.env.PERSISTENCE||"MONGO"
}