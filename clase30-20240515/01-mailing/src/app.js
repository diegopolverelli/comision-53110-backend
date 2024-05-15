import express from 'express';
import { upload } from './utils.js';
import { enviarMail } from './mails.js';
import fs from "fs"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"))

// [
//     {
//         path: "./images/diego10.jpg",
//         filename: "elDiego.jpg"
//     },
//     {
//         path: "./images/lio.jpg",
//         filename: "lio.jpg"
//     },
//     {
//         path: "./images/lio2.jpg",
//         filename: "otraDeLio.jpg"
//     },
// ]

app.post("/mail", upload.array("imagenes"), async(req, res)=>{

    let {to, subject, message}=req.body
    if(!to || !subject || !message){
        // res.setHeader('Content-Type','application/json');
        // return res.status(400).json({error:``})
        return res.redirect("/?mensaje=Complete los datos...!!!")
    }

    console.log(req.files)
    let attachments=[]
    req.files.forEach(archivo=>{
        attachments.push(
            {
                path: archivo.path,
                filename: archivo.originalname       
            }
        )
    })

    try {
        let resultado=await enviarMail(to, subject, message, attachments)
        req.files.forEach(file=>{
            fs.unlinkSync(file.path)
        })
        if(resultado.accepted.length>0){
            return res.redirect("/?mensaje=Envío correcto...!!!")
        }else{
            return res.redirect("/?mensaje=Error al enviar mail... :(")
        }
    } catch (error) {
        req.files.forEach(file=>{
            fs.unlinkSync(file.path)
        })
        return res.redirect("/?mensaje=Error al enviar mail: "+error.message)
    }

})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
