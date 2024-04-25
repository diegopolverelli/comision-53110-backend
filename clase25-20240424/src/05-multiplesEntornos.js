import express from 'express';
import mongoose from "mongoose"
import { config } from './config/05-config.js';
// const PORT=3000;
// const PORT=process.env.PORT;
const PORT=config.PORT;

console.log("prueba port:", config.PRUEBA_PORT)


// console.log(process.env.PORT)
// console.log(process.env.MENSAJE)
// console.log(process.env.SECRET)
// console.log(process.env.PRUEBA_PORT)

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send(config.MENSAJE);
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

try {
    await mongoose.connect(config.MONGO_URL,{
        dbName: config.DB_NAME
    })
    console.log("DB conectada...!!!")
} catch (error) {
    console.log(error.message)
}
