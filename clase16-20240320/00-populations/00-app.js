import mongoose from "mongoose";

const app=async()=>{

    await mongoose.connect("mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase16")

    const cursosModelo=mongoose.model(
        "cursos",
        new mongoose.Schema(
            {
                nombre: String, horas: Number, 
                docente: String  // ref???
            },
            {
                timestamps:true
            }
        )
    )

    const estudianteEsquema=new mongoose.Schema(
        {
            nombre:String, email:{type:String, unique:true},
            cursando:{
                type: [
                    {
                        curso: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "cursos"
                        }
                    }
                ]
            },
            // materiasAprobadas  // [{curso:ObjectId}],
            // nacionalidad // ref
        },
        {
            timestamps: true
        }
    )

    const estudiantesModelo=mongoose.model("estudiantes", estudianteEsquema)


    // borrar datos 
    // await cursosModelo.deleteMany({})
    // await estudiantesModelo.deleteMany({})

    // let curso01=await cursosModelo.create({
    //     nombre: "Calculo II", 
    //     horas: 8,
    //     docente: "Carina Gonzalez"
    // })

    // let curso02=await cursosModelo.create({
    //     nombre: "Base de Datos I", 
    //     horas: 4,
    //     docente: "Grabriel Perez"
    // })

    // let estudiante=await estudiantesModelo.create(
    //     {
    //         nombre: "Marina Lopez", email:"mlopez@test.com",
    //         cursando: [{curso:curso01._id}, {curso:curso02._id}]
    //     }
    // )

    // console.log({curso01, curso02})
    // console.log(JSON.stringify(estudiante, null, 5))

    let datosEstudiante=await estudiantesModelo.find()
            .populate("cursando.curso")

    console.log(JSON.stringify(datosEstudiante,null,5))

    datosEstudiante=await estudiantesModelo.findOne({_id:"65fae51a727f5884454d85a3"})
            .populate("cursando.curso")

    // console.log(JSON.stringify(datosEstudiante,null,5))

    datosEstudiante=await estudiantesModelo.findOne({_id:"65fae51a727f5884454d85a3"})
            .populate("cursando.curso")

    // console.log(JSON.stringify(datosEstudiante,null,5))


    datosEstudiante=await estudiantesModelo.findOne({_id:"65fae51a727f5884454d85a3"})
    .populate({
        path:"cursando.curso",
        // populate: {
        //     path: "docente",
        //     populate: {
        //         path: "nacionalidad"
        //     }
        // }
    })
    // .populate("materiasAprobadas.curso")
    // .populate("nacionalidad")
    .lean()

    console.log(JSON.stringify(datosEstudiante,null,5))

    process.exit() // finaliza el script
} // fin app()

app()