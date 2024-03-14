const fs=require("fs")

class CursosManager{
    constructor(ruta){
        this.path=ruta
    }

    async get(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
        }else{
            return []
        }
    }

    async create(curso){
        let cursos=await this.get()
        

        let id=1
        if(cursos.length>0){
            id=Math.max(...cursos.map(d=>d.id))+1
        }

        let cursoNuevo={
            id, ...curso
        }

        cursos.push(cursoNuevo)
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(cursos, null, 5))
        } catch (error) {
            return null            
        }
        return cursoNuevo
    }
}

module.exports=CursosManager