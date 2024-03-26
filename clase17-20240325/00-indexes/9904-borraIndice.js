import mongoose from "mongoose";

await mongoose.connect('mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase17')
console.log(`Conexión a DB establecida`)

// ELIMINAR TODOS LOS INDICES (nunca se eliminar el que MONGO hace sobre "_id")
let resultado = await mongoose.connection.collection('bigUsers').dropIndexes()
console.log(resultado)

resultado = await mongoose.connection.collection('bigAlumnos').dropIndexes()
console.log(resultado)

resultado = await mongoose.connection.collection('heroes').dropIndexes()
console.log(resultado)

let indices = await mongoose.connection.collection('heroes').listIndexes().toArray()
console.log(indices)

indices = await mongoose.connection.collection('bigAlumnos').listIndexes().toArray()
console.log(indices)

indices = await mongoose.connection.collection('bigAlumnos').listIndexes().toArray()
console.log(indices)

let alumnos = await mongoose.connection.collection('bigAlumnos').find().toArray()
console.log(alumnos)


process.exit()