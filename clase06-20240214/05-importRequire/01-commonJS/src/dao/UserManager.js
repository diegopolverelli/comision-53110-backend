const fs=require("fs")
const path=require("path")

// [{nombre:"juan", id:1},{nombre:"laura", id:2}]

// fs.readFileSync  // sincrona
// fs.readFile  // asincrona callbacks
// fs.promises.readFile //asincrona con promesas

class UserManager{
    constructor(rutaAlArhivo){
        this.path=rutaAlArhivo
    }

    async getUsuarios(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
        }else{
            return []
        }
    }

    async addUser(nombre, email, password){
        let usuarios=await this.getUsuarios()

        // manipular usuarios (que ahora está en memoria luego del getUsuarios)
        // y agregar al usuario... validar , etc... push
        // await fs.promises.writeFile(this.path, JSON.stringify(usuarios, null,5))
        
        
    }

}



// let usuarioManager=new UserManager("./usuarios.json") //ruta relativa
console.log("Contenido __dirname: ****",__dirname,"****")
// let usuarioManager=new UserManager(__dirname+"/usuarios.json") //ruta absoluta
let usuarioManager=new UserManager(path.join(__dirname,"usuarios.json") ) //ruta absoluta

console.log("RUTA SIN PATH: ***"+__dirname+"/usuarios.json"+"***")

console.log("RUTA CON PATH: ***"+path.join(__dirname,"usuarios.json")+"***")

// __filename
// console.log(usuarioManager.getUsuarios())
// usuarioManager.getUsuarios()
//     .then(res=>console.log(res))

const app=async()=>{
    let usuarios=await usuarioManager.getUsuarios()
    console.log(usuarios)
}

app()