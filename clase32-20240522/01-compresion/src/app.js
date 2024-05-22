import express from 'express';
import handlebars from 'express-handlebars'
import compression from "express-compression"
import zlib from "zlib"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(compression({
    brotli:{enabled:true}
}))
app.use(express.static("./src/public"))
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')


app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/texto1',(req,res)=>{

    let texto="Texto muuuuuuuuy muuuuuuy largo...".repeat(100000)
    // let textoComprimido=zlib.gzipSync(texto, {level:9})
    // let textoComprimido=zlib.deflateSync(texto)
    let textoComprimido=zlib.brotliCompressSync(texto)

    res.setHeader('Content-Type','text/html');
    // res.setHeader('Content-Encoding','gzip');
    // res.setHeader('Content-Encoding','deflate');
    res.setHeader('Content-Encoding','br');
    res.status(200).send(textoComprimido);
})

app.get('/texto2',(req,res)=>{

    let texto="Texto muuuuuuuuy muuuuuuy largo...".repeat(100000)

    res.setHeader('Content-Type','text/html');
    res.status(200).send(texto);
})

app.get('/heroes',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('prueba');
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
