import { usuariosModelo } from "./model/usuarios.model.js";

export class UsuariosMongoDAO{

    async getAll(filtro={}){
        return await usuariosModelo.find(filtro).lean() 
    }

    async getOneBy(filtro={}){   // filtro = {email:"juan@test.com", apellido:"Perez"}
        return await usuariosModelo.findOne(filtro)
    }

    async create(usuario){
        return await usuariosModelo.create(usuario)
    }
}