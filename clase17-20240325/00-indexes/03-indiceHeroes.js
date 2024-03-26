// ************************************************************
// ************************************************************
// ************************************************************
// MODIFICAR STRING DE CONEXIÓN...!!! APUNTARLO A LA INSTANCIA
// DE MONGODB ATLAS PARTICULAR
// ************************************************************
// ************************************************************
// ************************************************************

import mongoose from 'mongoose';



const heroesEsquema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: String,
    alias: String, 
    powers: {
        type: [String]
    }, 
    team: String,
    publisher: String,
    enemies:{
        type: [
            {
                name: String,
                powers: {
                    type: [
                        String
                    ]
                }
            }
        ]
    }

}, { collection: 'heroes' })

heroesEsquema.index({"enemies.name":1})
heroesEsquema.index({"enemies.powers":1})

export const heroesModelo = mongoose.model('heroes', heroesEsquema)

const conectar = async () => {
    try {
        await mongoose.connect('mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase17')
        console.log(`Conexión a DB establecida`)

        // let resultado=await heroesModelo.find({"enemies.name":"Joker"}).explain("executionStats")
        // console.log(JSON.stringify(resultado.executionStats, null, 5))

        let resultado=await heroesModelo.find({"enemies.powers":"Regeneration"}).explain("executionStats")
        console.log(JSON.stringify(resultado.executionStats, null, 5))

        resultado=await heroesModelo.find({"enemies.powers":"Regeneration"})
        console.log(JSON.stringify(resultado, null, 5))


        process.exit()

    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err.message}`)
    }
}

conectar();


