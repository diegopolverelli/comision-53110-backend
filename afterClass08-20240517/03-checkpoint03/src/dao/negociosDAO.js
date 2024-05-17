import { negociosModelo } from "./models/negocios.model.js";

export class NegociosDAO{
    async getAll(){
        return await negociosModelo.find().lean()
    }

    async getBy(filtro={}){
        return await negociosModelo.findOne(filtro).lean()
    }

    async create(negocio){
        let nuevoNegocio=await negociosModelo.create(negocio)
        return nuevoNegocio.toJSON()
    }

    // async update(id, negocio){
    //     return await negociosModelo.updateOne({_id:id}, negocio)
    // }

}