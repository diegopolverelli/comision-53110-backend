import { usuariosModelo } from "./models/usuarios.model.js";

export class UsuariosDAO{
    async getOneBy(filtro={}){
        return await usuariosModelo.findOne(filtro).lean()
    }

    async create(usuario){
        let resultado=await usuariosModelo.create(usuario)
        return resultado.toJSON()
    }
}