// import { MemoryHeroesDAO as DAO } from "../dao/memoryHeroesDAO.js"
// let heroesService=new DAO()

import { heroesService } from "../repository/HeroesService.js"

export async function getHeroes(req,res){

    // let heroes=await heroesService.get()
    let heroes=await heroesService.getHeroes()

    res.status(200).json({heroes})
}

