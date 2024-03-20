import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import mongoose from "mongoose"
import { router as vistasRouter } from './routes/vistasRouter.js';
import { engine } from 'express-handlebars';

const PORT = 3000;

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public')));

app.use("/", vistasRouter)

app.get("/",(req, res)=>{


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"OK"});
})

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

// const conn=async()=>{
//     try {
//         await mongoose.connect('mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase16')
//         console.log(`Conexión a DB establecida`)
        
//     } catch (error) {
//         console.log("Error DB. "+error.message)
//     }
// }
// conn()

try {
    await mongoose.connect('mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase16')
    console.log(`Conexión a DB establecida`)
    
} catch (error) {
    console.log("Error DB. "+error.message)
}
