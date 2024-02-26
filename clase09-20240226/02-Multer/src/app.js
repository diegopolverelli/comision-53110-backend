import express from 'express';
import __dirname, { upload } from './utils.js'
import path from "path"
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")))

// app.get('/', (req, res) => {
//     res.setHeader('Content-Type', 'text/plain');
//     res.status(200).send('OK');
// })

app.post("/profile", upload.single("foto"), (req, res)=>{

    let {nombre}=req.body

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({mensaje:`Se cargo la imagen del heroe ${nombre} y se guardó en ${req.file.path}`});

})

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
