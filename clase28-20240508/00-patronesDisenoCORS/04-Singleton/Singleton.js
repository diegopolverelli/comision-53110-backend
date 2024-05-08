import mongoose from "mongoose";

export class Singleton{
    static #instancia   
    constructor(url){
        mongoose.connect(url)
    }

    static conectarDB(url){
        if(this.#instancia){
            console.log(`Conexión previmante establecida...!!!`)
            return this.#instancia
        }

        this.#instancia=new Singleton(url)
        console.log("DB Conectada...!!!")
        return this.#instancia
    }
}

Singleton.conectarDB("mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase14")
Singleton.conectarDB("mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase14")
Singleton.conectarDB("mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase14")

const usuariosModelo=mongoose.model(
    "usuarios",
    new mongoose.Schema(
        {
            nombre:String, email:String
        }
    )
)

usuariosModelo.find().then(res=>{
    console.log(res)
    process.exit()
})