const fs=require("fs")


class UsuariosManager{
    constructor(rutaArchivo){
        this.path=rutaArchivo
    }

    async getUsers(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
        }else{
            return []
        }
    }

    // async saludo(){
    //     return "hola"
    // }

    async addUser(nombre){
        let usuarios=await this.getUsers()
        // validaciones...

        // [{id:1, nombre:"juan"}, {id:2, nombre:"lore"}]
        // .map   [1, 2, 3, 4]
        // ... spread

        let id=1
        if(usuarios.length>0){
            // id=usuarios[usuarios.length-1].id + 1
            id=Math.max(...usuarios.map(usuario=>usuario.id))+1
        }

        usuarios.push({
            id, nombre
        })

        await fs.promises.writeFile(this.path, JSON.stringify(usuarios, null, 5))
    }

}

module.exports=UsuariosManager

// const funcion1=async()=>{
//     let um=new UsuariosManager("./usuarios.json")
//     await um.addUser("Carolina")
//     await um.addUser("Luis")
//     console.log(await um.getUsers())

// }

// funcion1()