import fs from "fs"

export class HeroesManager{
    constructor(ruta){
        this.path=ruta
    }

    getHeroes(){
        if(fs.existsSync(this.path)){
            return JSON.parse(fs.readFileSync(this.path, {encoding:"utf-8"}))
        }else{
            return []
        }
    }
}