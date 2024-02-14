const express=require("express")
const villanos=require("./datos/heroes").villanos

const PORT=3000

const app=express()

app.get("/", ( req, res)=>{
    // console.log(req.query)

    res.send("Server Online...!!!")
})

app.get("/villanos", ( req, res)=>{
    // console.log(req.query)

    res.json(villanos)
})

app.get("/villanos/:id", ( req, res)=>{
    // console.log(req.query)

    let {id}=req.params
    id=Number(id)
    if(isNaN(id)){
        return res.send("El id tiene que ser de tipo numérico...!!!")
    }

    let villano=villanos.find(villano=>villano.id===id)
    if(!villano){
        return res.send(`No existen villanos con id ${id}`)
    }

    // res.json(villano)
    // res.send(JSON.stringify(villano))
    res.send(`<h2>${villano.name}</h2>`)
})


app.get("/heroes/superman", ( req, res)=>{
    // console.log(req.query)

    res.send("Superman Page")
})

app.get("/datos/:nombre/:apellido", ( req, res)=>{
    // console.log(req.query)

    let {nombre, apellido}=req.params
    

    res.send(`Nombre ingresado: ${nombre} ${apellido}`)
})


app.get("*", (req, res)=>{

    res.send("error 404 - Not Found")
})



app.listen(PORT, ()=>{
    console.log(`Server Online en pueto ${PORT}`)
})