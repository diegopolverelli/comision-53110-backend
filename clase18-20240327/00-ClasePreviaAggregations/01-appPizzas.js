import express from 'express';
import mongoose from 'mongoose';

const ventasCol='ventas'

const ventasEsquema=new mongoose.Schema({
    name:String,
    size:{
        type: String,
        enum:["small","medium","large"],
        default:"medium"
    },
    price:Number, 
    quantity:Number,
    date:Date, 
})

const ventasModelo=mongoose.model(ventasCol,ventasEsquema);

const env=async()=>{
    try {
        await mongoose.connect('mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase17')
        console.log(`Conexión a DB establecida`);

    } catch (error) {
        console.log(`Error en la app: ${error.message}`);
    }
}

env()
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',async(req,res)=>{
    let ventas=await ventasModelo.find().lean()

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({ventas});

})

app.get('/informe',async(req,res)=>{
    
    let informe=await ventasModelo.aggregate(
        [
            {
                $match:{ size: {$in:["medium","small"]}}
            },
            {
                $group:{
                    _id: "$name",
                    cantidadTotal:{$sum:"$quantity"},
                    precioMax: {$max:"$price"},
                    precioMin: {$min:"$price"},
                    precioPromedio: {$avg:"$price"},
                }
            },
            {
                $sort:{
                    cantidadTotal: -1
                }
            },
            {
                $project:{
                    _id:0,
                    cantidadTotal:1,
                    precioPromedio:1, 
                    info:"ventas febrero 2024",
                    responsable:"marketing",
                    sabor: "$_id"
                }
            },
            {
                $group:{
                    _id:"",
                    detalle: {$push: "$$ROOT"},
                    detalleReducido: {$push:{
                        sabor:"$sabor", cantidad:"$cantidadTotal"
                    }}
                }
            },
            {
                $project:{
                    _id:0, detalleReducido:1, 
                    titulo:"Ventas abril 2024",
                    confecciono:"Comision 53110"
                }
            },
            {
                $merge:{into:"reports"}
            }
        ]
    )

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({informe});

})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
