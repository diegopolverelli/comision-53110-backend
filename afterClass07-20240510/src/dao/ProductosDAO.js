import { productosModelo } from "./models/productos.model.js";


export class ProductosDAO{
    async getAll(filtro={}){
        let resultado=await productosModelo.find(filtro).lean()
        // console.log(resultado)
        return resultado
    }

    async getOneBy(filtro={}){
        return await productosModelo.findOne(filtro).lean()
    }

    async create(producto){
        return await productosModelo.create(producto)
    }
}

// let ModeloDeProductosParaVender= //uppercamelcase
// let modeloDeProductosParaVender= //camelcase
// let modelo_de_productos_para_vender= //snakecase