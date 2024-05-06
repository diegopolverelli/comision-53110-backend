import { heroesModelo } from "./model/heroes.model.js";

export class HeroesMongoDAO{
    async getAll(){
        return await heroesModelo.find().lean()
    }

    async create(usuario){
        return await heroesModelo.create(usuario) 
    }

}