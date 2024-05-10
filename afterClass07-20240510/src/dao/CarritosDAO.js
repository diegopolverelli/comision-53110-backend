import { carritosModelo } from "./models/carritos.model.js"


export class CarritosDAO{

    async getOneBy(filtro={}){
        return await carritosModelo.findOne(filtro).lean()
    }

    async getOneByPopulate(filtro={}){
        return await carritosModelo.findOne(filtro).populate("productos.producto").lean()
    }

    async create(){
        return await carritosModelo.create({productos:[]})
    }

    async update(id, carrito){
        return await carritosModelo.updateOne({_id:id}, carrito)
    }
}