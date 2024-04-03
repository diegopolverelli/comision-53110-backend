import express from 'express';
import session from "express-session"
import MongoStore from "connect-mongo"
import { auth } from './middlewares/auth.js';
import { router as heroesRouter } from './routes/heroes.router.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session(
    {
        secret:"CoderCoder123", 
        resave: true, 
        saveUninitialized: true,
        store: MongoStore.create(
            {
                mongoUrl: "mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase19",
                ttl: 60
            }
        )
    }
))

let usuarios=[
    {
        nombre:'Diego', password:123, 
        rol: 'usuario'
    },
    {
        nombre:'Laura', password:123, 
        rol: 'usuario'
    },
    {
        nombre:'Admin', password:'codercoder', 
        rol: 'admin'
    },
]

app.use("/api/heroes", heroesRouter)

app.get('/',(req,res)=>{

    let mensaje="Bienvenido"
    if(req.session.contador){
        req.session.contador++
        mensaje+=`. Visitas a esta ruta: ${req.session.contador}`
    }else{
        req.session.contador=1
    }

    res.setHeader('Content-Type','text/plain');
    res.status(200).send(mensaje);
})

app.get("/login", (req, res)=>{
    let {nombre, password} =req.query
    if(!nombre || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete los datos`})
    }

    let usuario=usuarios.find(u=>u.nombre===nombre && u.password==password)
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(403).json({error:`Credenciales incorrectas`})
    }

    usuario={...usuario}
    delete usuario.password
    req.session.usuario=usuario

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Login exitoso", usuario});

})

app.get("/logout", (req, res)=>{
    req.session.destroy(error=>{
        if(error){
            console.log(error)
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${error.message}`
                }
            )
            
        }
    })

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Logout exitoso"});
})

app.get('/datos', auth, (req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        datos:"ruta datos..."
    });
});

app.get('/imagenes', auth, (req,res)=>{
    
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        datos:"ruta imagenes..."
    });
});

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
