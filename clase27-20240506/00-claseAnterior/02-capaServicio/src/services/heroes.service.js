import { HeroesMongoDAO as HeroesDAO} from "../dao/HeroesMongoDAO.js"

class HeroesService{
    constructor(dao){
        this.HeroesDAO=dao
    }

    async getAllHeroes(){
        return await this.HeroesDAO.getAll()
    }

    async crearHeroe(heroe){
        return await this.HeroesDAO.create(heroe)
    }
}

export const heroesService=new HeroesService(new HeroesDAO())