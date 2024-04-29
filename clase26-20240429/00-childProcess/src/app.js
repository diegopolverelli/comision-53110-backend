import express from 'express';
import {fork, exec} from "child_process"

const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

let contador=0
app.get('/contador',(req,res)=>{
    contador+=10
    res.setHeader('Content-Type','text/html');
    res.status(200).send(`<h3>Contador: ${contador}</h3>`);
})

const calculo=()=>{
    console.time("Demora proceso:")
    let resultado=0

    for(let i=0; i<1_000_000_000; i++){
        resultado+=Math.floor(Math.random()*(10)+1)      // Math.floor(Math.random()*(cantNrosAGenerar)+aPartirDelNro)
    }

    console.timeEnd("Demora proceso:")
    return resultado
}

app.get('/opBloqueante01',(req,res)=>{
    let resultado=calculo()
    res.setHeader('Content-Type','text/html');
    res.status(200).send(`<h3>Resultado: ${resultado}</h3>`);
})

app.get('/opNoBloqueante',(req,res)=>{
    // let resultado=calculo()

    let child=fork("./src/calculo.js")
    child.send(`Soy el proceso con id ${process.pid} y necesito que te ejecutes`)
    child.on("message", resultado=>{

        res.setHeader('Content-Type','text/html');
        res.status(200).send(`<h3>Resultado: ${resultado}</h3>`);
    })

})

app.get('/directorio',(req,res)=>{

    exec("dir src /s", (error, salida)=>{
        if(error){
            console.log(error);
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${error.message}`
                }
            )
        }

        res.setHeader('Content-Type','text/plain');
        return res.status(200).send(salida);
    })

})

app.get('/calculadora',(req,res)=>{

    exec("calc.exe", (error, salida)=>{
        if(error){
            console.log(error);
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${error.message}`
                }
            )
        }

        res.setHeader('Content-Type','text/plain');
        return res.status(200).send("calculadora corriendo");
    })

})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT} - pid: ${process.pid}`);
});
