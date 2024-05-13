
export class UsuariosDTO{
    constructor(usuario){
        this.firstName=usuario.nombre.toUpperCase()
        this.lastName=usuario.apellido?usuario.apellido.toUpperCase():" no especificado "
        if(usuario.apellido){
            this.fullName=this.firstName+" "+this.lastName
        }else{
            this.fullName=this.firstName
        }
        this.rol="user"
        this.email=usuario.email
    }
}