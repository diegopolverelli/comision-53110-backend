import express from 'express';
import cookieParser from "cookie-parser"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser("CoderCoder123"))
app.use(express.static('./src/public'))

app.get('/',(req,res)=>{

    
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/setcookies',(req,res)=>{
    
    let info={
        nombre:"Juan", theme:"dark", fontSize: 18
    }

    // res.cookie("cookie01", "valor cookie01")
    res.cookie("cookie01", info)
    res.cookie("cookie02conVencimiento", info, {maxAge: 1000*5})
    res.cookie("cookie03conVencimiento", info, {expires: new Date( 2024, 2, 31)})
    res.cookie("cookie04firmada", info, {signed:true})

    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        message:"Cookies generadas...!!!"
    });
});

app.get("/getcookies", (req,res)=>{

    console.log(req.headers.cookie)

    let cookies=req.cookies
    let cookiesFirmadas=req.signedCookies

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({cookies, cookiesFirmadas});
})

app.get("/delcookies", (req, res)=>{


    // res.clearCookie("apellido")
    let nombreCookies=Object.keys(req.cookies)
    console.log(nombreCookies)
    nombreCookies.forEach(c=>res.clearCookie(c))

    nombreCookies=Object.keys(req.signedCookies)
    console.log(nombreCookies)
    nombreCookies.forEach(c=>res.clearCookie(c))

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Cookies eliminadas"});
})



const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
