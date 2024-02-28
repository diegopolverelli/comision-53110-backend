import fs from "fs"
export class DemonSlayerManager{
    constructor(archivo){
        this.path=archivo
    }

    async getPersonajes(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
        }else{
            return []
        }
    }

    async create(personaje){
        let personajes=await this.getPersonajes()
        let id=1
        if(personajes.length>0){
            id=Math.max(...personajes.map(d=>d.id))+1
        }
        personaje.id=id
        personajes.push(personaje)
        await fs.promises.writeFile(this.path, JSON.stringify(personajes, null, 5))
        return personaje
    }

}