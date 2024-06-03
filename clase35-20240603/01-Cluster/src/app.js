import express from 'express';
import os from "os"
import cluster from "cluster"
import { router as pruebasRouter } from './routes/pruebaRouter.js';

if(cluster.isPrimary){
    console.log(os.cpus())
    console.log("Cantidad de CPUs:",os.cpus().length)
    console.log(`Soy el proceso primary, con id ${process.pid}, y voy a generar nodos...`)
    // cluster.fork()
    // cluster.fork()
    // cluster.fork()
    for(let i=0; i<os.cpus().length; i++){
        cluster.fork()
    }

    cluster.on("message", (worker, message)=>{
        console.log("Primario escucho:", worker.id, message)
    })

    cluster.on("disconnect", worker=>{
        console.log(`El worker ${worker.id} se ha desconectado... generando nuevo worker`)
        cluster.fork()
    })
}else{
    const PORT=3000;

    const app=express();
    
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    
    app.use("/", pruebasRouter)
    
    let visitas=0
    app.get('/',(req,res)=>{
        process.send("hola...!!!")
        visitas++
        res.setHeader('Content-Type','text/plain');
        res.status(200).send(`Visitas: ${visitas}`);
    })
    
    const server=app.listen(PORT,()=>{
        console.log(`Server escuchando en puerto ${PORT} - pid: ${process.pid} - worker n°: ${cluster.worker.id}`);
    });
    
}



