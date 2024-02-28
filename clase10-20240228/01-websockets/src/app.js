import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import {Server} from "socket.io"
import {engine} from 'express-handlebars';
import { router as demonRouter } from './routes/demon.router.js';
import { router as vistasRouter } from './routes/vistas.router.js';

const PORT=3000;
let serverSocket; // io

const app=express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'/public')));

app.use("/api/demon", (req, res, next)=>{
    req.serverSocket=serverSocket
    next()
},demonRouter)
app.use("/", vistasRouter)

app.get('/',(req,res)=>{
    
    res.setHeader('Content-Type','text/plain');
    res.status(200).send("OK");
});

const serverHttp=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

serverSocket=new Server(serverHttp)  //io

serverSocket.on("connection" , socket=>{
    console.log(`Se ha conectado un cliente con id ${socket.id}`)
    socket.emit("saludo", {emisor:"Server", mensaje:"Bienvenido al server...!!!"})

    socket.on("id", nombre=>{
        console.log(`El usuario se ha identificado como ${nombre}`)
        socket.broadcast.emit("nuevoUsuario", nombre)
    })
})


setInterval(() => {
    let temperatura=Math.floor(Math.random()*(5)+28)      // Math.floor(Math.random()*(cantNrosAGenerar)+aPartirDelNro)
    serverSocket.emit("temperatura", temperatura)
}, 1000);

