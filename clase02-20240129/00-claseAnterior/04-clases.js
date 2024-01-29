

class Persona{

    static cantidadPersonas=0

    constructor(nombre, apellido, email){
        this.nombre=nombre
        this.apellido=apellido
        this.email=email

        Persona.cantidadPersonas++
    }

    saludo(){
        console.log(`Hola...!!! me llamo ${this.nombre}`)
    }

    cambiarNombre(nombre){
        // validacion
        let regExNumeros=/[0-9]/
        if(regExNumeros.test(nombre)){
            console.log(`No se adminten numeros en el nombre...!!!`)
            return 
        }
        this.nombre=nombre
    }

    static verCantidadPersonas(){
        return this.cantidadPersonas
        // Persona.cantidadPersonas
    }

}

let persona01=new Persona("Diego", "Ramirez", "dramirez@test.com")
let persona02=new Persona("Laura", "Moralez", "lmoralez@test.com")

console.log({persona01, persona02})
persona02.saludo()
persona02.cambiarNombre("Lorena77")
persona02.saludo()


let persona03={
    nombre:"Juan Carlos", apellido:"Lopez"
}

persona03.nombre="Raúl"

// console.log(Persona.cantidadPersonas)
console.log(Persona.verCantidadPersonas())


// managers:

class UsuariosManager{
    constructor(){
        this.usuarios=[]
    }

    addUsuario(nombre, email){
        // validaciones
        let existe=this.usuarios.find(usuario=>usuario.email===email)
        if(existe){
            console.log(`El usuario con email ${email} ya existe...!!!`)
            return 
        }

        // id único autoincremental...
        // Date.now()
        // uuid 
        let id=1
        if(this.usuarios.length>0){
            id=this.usuarios[this.usuarios.length-1].id +1
        }

        let nuevoUsuario={ id, nombre, email}
        this.usuarios.push(nuevoUsuario)
    }

    verUsuarios(){
        return this.usuarios
    }

    verUsuarioById(id){
        let usuario=this.usuarios.find(u=>u.id===id)
        if(!usuario){
            console.log(`No existen usuarios con id ${id}...!!!`)
            return 
        }

        return usuario
    }
}

// let usuarios=[]
// usuarios.push({nombre:"Juan", id:1})
// usuarios.push({nombre:"Marcos", id:2})
// usuarios.push({nombre:"Jimena", id:1})

// console.log(usuarios)

let um=new UsuariosManager()
um.addUsuario("Diego", "diego@test.com")
um.addUsuario("Lorena", "lorena@test.com")
um.addUsuario("Diego", "diego@test.com") // duplicar un alta
um.addUsuario("Federico", "federico@test.com")
console.log(um.verUsuarios())

console.log(um.verUsuarioById(2))
console.log(um.verUsuarioById(3))
