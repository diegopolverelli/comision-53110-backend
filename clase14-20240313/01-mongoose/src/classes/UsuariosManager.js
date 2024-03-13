import { modeloUsuarios } from "../dao/models/usuarios.modelo.js"


export class UsuariosManager{
    constructor(){
        // this.usuarios=[
        //     {id:1, nombre:'Juan', email:'jlopez@gmail.com'}
        // ]
    }

    async getUsuarios(){
        // return this.usuarios
        return await modeloUsuarios.find()
    }

    async getUsuarioByEmail(email){
        // return this.usuarios
        return await modeloUsuarios.findOne({email})
    }

    async addUsuario(usuario){
        // let id=1
        // if(this.usuarios.length>0){
        //     id=Math.max(...this.usuarios.map(d=>d.id))+1
        // }
        
        // usuario={
        //     id, ...usuario
        // }

        // this.usuarios.push(usuario)

        return await modeloUsuarios.create(usuario)

    }
}