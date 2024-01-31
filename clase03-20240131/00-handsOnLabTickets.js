class TicketManager{
    static #precioBaseganancia=0.15
    // static #ganancia2=0.15

    constructor(){
        this.eventos=[]
    }

    getEventos(){
        return this.eventos
    }

    addEventos(nombre, lugar, fecha=new Date(), capacidad=50, costo=0){
        // validaciones, formateo de datos, etc...
        if(!nombre || !lugar){
            console.log("Complete nombre y lugar")
            return
            // throw new Error("Complete nombre y lugar")
        }

        let existe=this.eventos.find(evento=>evento.nombre===nombre && evento.lugar===lugar)
        if(existe){
            console.log(`El evento ${nombre} ya existe...!!!`)
            return 
        }

        let id=1
        if(this.eventos.length>0){
            // [1,2,3,4,5]
            // this.eventos[this.eventos.length-1].id + 1
            id=this.eventos[this.eventos.length-1].id +1
        }

        let nuevoevento={
            id, nombre, lugar, fecha, capacidad,
            costo:costo+costo*TicketManager.#precioBaseganancia,
            asistentes:[]
        }
        this.eventos.push(nuevoevento)
    }

    addUsuario(id, nombre, email){
        let indiceEvento=this.eventos.findIndex(evento=>evento.id===id)
        if(indiceEvento===-1){
            console.log(`No existen eventos con id ${id}`)
            return
        }

        let existe=this.eventos[indiceEvento].asistentes.find(asistente=>asistente.email===email)
        if(existe){
            console.log(`El usuario con email ${email} ya esta registrado en el evento ${id}`)
            return
        }

        this.eventos[indiceEvento].asistentes.push({nombre, email})

    }

    ponerEnGira(id, lugar, fecha){
        let indiceEvento=this.eventos.findIndex(evento=>evento.id===id)
        if(indiceEvento===-1){
            console.log(`No existen eventos con id ${id}`)
            return
        }    

        let nuevoId=this.eventos[this.eventos.length-1].id +1

        let nuevoEvento={
            // nombre:this.eventos[indiceEvento].nombre,
            ...this.eventos[indiceEvento], // operador spread
            
            id:nuevoId,
            lugar, 
            fecha,
            asistentes:[],
            // id:100
        }
        this.eventos.push(nuevoEvento)
    }

}

const tm01=new TicketManager()

console.log(tm01.getEventos())
tm01.addEventos("afterClass", "en remoto", new Date(2024, 1, 14), 100, 100)
tm01.addEventos("afterClass II", "en remoto tambien", new Date(2024, 1, 14), 100, 100)
tm01.addEventos("afterClass III", "en remoto", new Date(2024, 1, 14), 100, 100)
tm01.addEventos("afterClass", "en remoto", new Date(2024, 1, 14), 100, 100)

tm01.addUsuario(90, "Miguel", "miguel@test.com")
tm01.addUsuario(2, "Miguel", "miguel@test.com")
tm01.addUsuario(3, "Miguel", "miguel@test.com")
tm01.addUsuario(2, "Romina", "romina@test.com")
tm01.addUsuario(2, "Miguel", "miguel@test.com")

tm01.ponerEnGira(1, "por zoom", new Date(2024,3,10))
tm01.ponerEnGira(2, "por zoom también", new Date(2024,5,10))

console.log(JSON.stringify(tm01.getEventos(),null, 5))
// console.table(tm01.getEventos())
