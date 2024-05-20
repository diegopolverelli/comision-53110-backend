import express from 'express';
import { generaFactura } from './mocks/mock.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/facturas',(req,res)=>{
    
    let {cantidad}=req.query
    if(!cantidad) cantidad=1

    let facturas=[]
    for(let i=0; i<cantidad; i++){
        facturas.push(generaFactura())
    }

    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        facturas
    });
});

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
