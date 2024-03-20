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

    estudianteEsquema.pre("find", function(){
        this.populate("cursando.curso").lean()
    })

    estudianteEsquema.pre("findOne", function(){
        this.populate("cursando.curso").lean()
    })

    const estudiantesModelo=mongoose.model("estudiantes", estudianteEsquema)


    let datosEstudiante=await estudiantesModelo.find()

    console.log(JSON.stringify(datosEstudiante,null,5))

    datosEstudiante=await estudiantesModelo.findOne()

    console.log(JSON.stringify(datosEstudiante,null,5))

    process.exit() // finaliza el script
} // fin app()

app()