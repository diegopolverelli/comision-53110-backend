export class UsuariosMemoryDAO{
    constructor(){
        this.usuarios=[
            {id:1, nombre:"Juan"},
            {id:2, nombre:"Lorena"},
            {id:3, nombre:"Paula"},
        ]
    }

    getAll(){
        return this.usuarios
    }
}