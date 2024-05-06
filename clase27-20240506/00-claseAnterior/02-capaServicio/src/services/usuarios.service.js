import { UsuariosMongoDAO as UsuariosDAO } from "../dao/UsuariosMongoDAO.js"

class UsuariosService{
    constructor(dao){
        this.UsuariosDAO=dao
    }

    async getAllUsuarios(){
        return this.UsuariosDAO.getAll()
    }

    async getUsuarioByEmail(email){
        return await this.UsuariosDAO.getOneBy({email})
    }

    async getUsuarioById(id){
        return await this.UsuariosDAO.getOneBy({_id:id})
    }

    async getUsuarioByNombre(nombre){
        return await this.UsuariosDAO.getOneBy({nombre})
    }

    async crearUsuario(usuario){
        return await this.UsuariosDAO.create(usuario)
    }

}

export const usuariosService=new UsuariosService(new UsuariosDAO())