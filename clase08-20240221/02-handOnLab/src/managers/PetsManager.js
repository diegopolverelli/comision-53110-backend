const { getDatos, saveDatos } = require("../varios")

class PetManager{
    constructor(ruta){
        this.ruta=ruta
    }

    getPets(){
        return getDatos(this.ruta)
    }

    createPet(pet){

        let pets=this.getPets()
        console.log(pets)

        let id=1
        if(pets.length>0){
            id=Math.max(...pets.map(d=>d.id))+1
        }
        
        let nuevaMascota={
            id, ...pet
        }

        pets.push(nuevaMascota)
        saveDatos(this.ruta, pets)

        return nuevaMascota
    }

}

module.exports=PetManager