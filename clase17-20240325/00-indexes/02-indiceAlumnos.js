import mongoose from 'mongoose';

let alumnoEsquema=new mongoose.Schema({
    codigo: Number,
    nombre: String, 
    apellido: String,
    email: String,
    estudios: String,
    origen: String,
    promedio: Number
  }, {collection:'bigAlumnos'})

//   alumnoEsquema.index({nombre: -1})
//   alumnoEsquema.index({nombre: -1, apellido: -1})
//   alumnoEsquema.index({email:"text", apellido:"text"})

let alumnoModelo=mongoose.model('alumnos', alumnoEsquema)


const entorno=async()=>{
    try {
        await mongoose.connect('mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase17')
        console.log(`Conexión a DB establecida`)

        // let resultado=await alumnoModelo.find({nombre:"Morena"}).explain("executionStats")
        // console.log(JSON.stringify(resultado.executionStats, null, 5))

        // let resultado=await alumnoModelo.findOne({nombre:"Morena"}).explain("executionStats")
        // console.log(JSON.stringify(resultado.executionStats, null, 5))

        // let resultado=await alumnoModelo.findOne({nombre:"Domingo"}).explain("executionStats")
        // console.log(JSON.stringify(resultado.executionStats, null, 5))

        let resultado=await alumnoModelo.find({$text:{$search:"hotmail"}}).explain("executionStats")
        console.log(JSON.stringify(resultado.executionStats, null, 5))



    } catch (error) {
        console.log(error.message)
    }

}

entorno()