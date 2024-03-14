const fs=require("fs")

class AlumnosManager{
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

    async getById(id){
        let alumnos=await this.get()
        return alumnos.find(alumno=>alumno.id===id)
    }

    async inscribir(idAlumno, idCurso, descrip){
        let alumnos=await this.get()
        console.log({idAlumno, idCurso, descrip})

    }
}

module.exports=AlumnosManager