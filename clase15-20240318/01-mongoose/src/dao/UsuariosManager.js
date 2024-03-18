import { modeloUsuarios } from "./models/usuarios.modelo.js"


export class UsuariosManager{
    constructor(){
        // this.usuarios=[
        //     {id:1, nombre:'Juan', email:'jlopez@gmail.com'}
        // ]
    }


// Por defecto, si consultan con find o findOne (sin lean()), el resultado está comprendido
// por objetos "hidratados". Esto puede dar problemas en algunos casos. No siempre
// Para evitarlo:
//      - lean() luego del find / findOne
//      - sin el lean, someter cada objeto a .toObject() o .toJSON()

    async getUsuarios(){
        // return this.usuarios
        return await modeloUsuarios.find().lean()
    }

    async getUsuarioById(id){
        // return this.usuarios
        // return await modeloUsuarios.findOne({id})
        return await modeloUsuarios.findById(id).lean()
    }

    async getUsuarioByEmail(email){
        // return this.usuarios
        return await modeloUsuarios.findOne({email}).lean()
    }

    async getUsuarioBy(filtro){  // {email:"juan@test.com", _id:{$ne:"ajsdfaslkdfj888"}}
        // return this.usuarios
        return await modeloUsuarios.findOne(filtro).lean()    //{email:"juan@test.com"}
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

    async update(id, modificacion={}){  // {email:"juan@test.com", _id:{$ne:"ajsdfaslkdfj888"}}
        // return this.usuarios
        return await modeloUsuarios.updateOne({_id:id}, modificacion)    //{email:"juan@test.com"}
    }

    async delete(id){  // {email:"juan@test.com", _id:{$ne:"ajsdfaslkdfj888"}}
        // return this.usuarios
        return await modeloUsuarios.deleteOne({_id:id})    //{email:"juan@test.com"}
    }

} // fin class