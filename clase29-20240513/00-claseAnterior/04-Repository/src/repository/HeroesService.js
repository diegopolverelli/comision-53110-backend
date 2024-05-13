import { HeroesDTO } from "../DTO/HeroesDTO.js"
import { MemoryHeroesDAO } from "../dao/memoryHeroesDAO.js"

class HeroesService{
    constructor(dao){
        this.heroesDAO=dao
    }

    async getHeroes(){
        let heroes=await this.heroesDAO.get()
        heroes=heroes.map(heroe=>new HeroesDTO(heroe))
        return heroes
    }
}

export const heroesService=new HeroesService(new MemoryHeroesDAO())