import mongoose from 'mongoose';

const usuariosEsquema = new mongoose.Schema({
    first_name: {
        type: String, index:true
    },
    last_name: String,
    email: {type: String, unique:true}, 
    gender: String, 
    code: Number
}, { collection: 'bigUsers' })

export const usuariosModelo = mongoose.model('usuarios', usuariosEsquema)

const entorno=async()=>{
    try {
        await mongoose.connect('mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase17')
        console.log(`Conexión a DB establecida`)

        // let resultado=await usuariosModelo.find().explain("executionStats")
        // console.log(JSON.stringify(resultado.executionStats,null,5))

        // let resultado=await usuariosModelo.find({first_name:"Bill"}).explain("executionStats")
        // console.log(JSON.stringify(resultado.executionStats,null,5))

        // let resultado=await usuariosModelo.findOne({first_name:"Bill"}).explain("executionStats")
        // console.log(JSON.stringify(resultado.executionStats,null,5))

        let resultado=await usuariosModelo.findOne({first_name:"Marcellina"}).explain("executionStats")
        console.log(JSON.stringify(resultado.executionStats,null,5))

        
    } catch (error) {
        console.log(error.message)
    }
}

entorno()