import { usuariosModelo } from "./models/usuarios.model.js";

export class UsuariosDAO{
    async getAll(){
        return await usuariosModelo.find().populate("ordenes.orden").lean()
    }

    async getBy(filtro={}){
        return await usuariosModelo.findOne(filtro).lean()
    }

    async create(usuario){
        let nuevoUsuario=await usuariosModelo.create(usuario)
        return nuevoUsuario.toJSON()
    }

    async update(id, usuario){
        return await usuariosModelo.updateOne({_id:id}, usuario)
    }

}