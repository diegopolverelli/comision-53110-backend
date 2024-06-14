import dotenv from "dotenv"

dotenv.config({
    override: true, path: "./src/.env"
})

export const config={
    general:{
        PORT: process.env.PORT||3000,
        SECRET: process.env.SECRET
    },
    db:{
        MONGO_URL: process.env.MONGO_URL, 
        DB_NAME: process.env.DB_NAME
    }
}