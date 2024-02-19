import express from 'express';
const PORT=3000;

const app=express();

app.use(express.json());  // transformar info que viene vía body en la requres a un json
app.use(express.urlencoded({extended:true}));  // me permite recibir información compleja vía request

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})


app.get('/suma/:valor1/:valor2',(req,res)=>{

    let {valor1, valor2}=req.params
    valor1=Number(valor1)
    valor2=Number(valor2)

    try {
        if(valor2===-90){
            throw new Error("Error de prueba...")
        }
    } catch (error) {
        return res.status(500).send("Error inesperado, reintente en un rato...")
    }

    if(isNaN(valor1) || isNaN(valor2)){
        return res.status(400).send("Ingrese valores numéricos")
    }

    let resultado=`La suma de ${valor1} y ${valor2} es ${valor1+valor2}`

    resultado=`${valor1 + valor2}` 

    res.setHeader('Content-Type','text/plain');
    // res.status(200).send(resultado);
    res.send(resultado)
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
