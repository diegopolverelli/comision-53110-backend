import { ordenesModelo } from "./models/ordenes.model.js";

export class OrdenesDAO{
    async getAll(){
        return await ordenesModelo.find().populate("cliente").populate("negocio").lean()
    }

    async getBy(filtro={}){
        return await ordenesModelo.findOne(filtro).lean()
    }

    async create(orden){
        let nuevaOrden=await ordenesModelo.create(orden)
        return nuevaOrden.toJSON()
    }

    // async update(id, orden){
    //     return await ordenesModelo.updateOne({_id:id}, orden)
    // }

}