import { mascotasModelo } from "./models/mascotas.modelo.js";

export class MascotasManagerMongo{
    constructor(){}

    async getMascotas(){
        return await mascotasModelo.find().lean()
    }
}