const express=require("express")
const modulo=require("./heroes")
const heroes=require("./heroes").heroes

const PORT=3000

const app=express()

app.get("/", (req, res)=>{

    res.send("Server básico con Express...!!!")
})

app.get("/heroes", (req, res)=>{

    // let limit=req.query.limit
    // let skip=req.query.skip
    let {limit, skip}=req.query

    let resultado=heroes
    if(skip && skip>0){
        resultado=resultado.slice(skip)
    }

    if(limit && limit>0){
        resultado=resultado.slice(0, limit)
    }


    res.json(resultado)
})

app.get("/bienvenido", (req, res)=>{

    // res.setHeader()
    res.send(`<h2 style="color: blue;">Server básico con Express...!!!</h2>`)
})

app.get("/contacto", (req, res)=>{

    console.log(req.query)
    if(req.query.nombre){
        res.send("Contacto Page "+req.query.nombre)

    }else{
        res.send("Contacto Page")

    }

})



app.listen(PORT, ()=>{
    console.log(`Server OK en puerto ${PORT}`)
})