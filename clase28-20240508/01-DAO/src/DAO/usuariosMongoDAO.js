import { usuariosModelo } from "./models/usuarios.model.js"

console.log("Persistencia en Mongo iniciada")

export class usuariosMongoDAO{
    constructor(){}

    async get(){
        return await usuariosModelo.find().lean()
    }

    async getBy(filtro={}){
        return await usuariosModelo.findOne(filtro).lean()
    }

    async create(usuario){
        let nuevoUsuario=await usuariosModelo.create(usuario)
        return nuevoUsuario.toJSON()
    }
}