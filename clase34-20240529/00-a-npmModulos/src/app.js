const colors=require("colors")

const saludo01=(nombre="")=>{
    console.log(`Hola ${nombre}, bienvenido...!!!`.rainbow)
}

const saludo02=(nombre="")=>{
    console.log(`Hola ${nombre}, bienvenido...!!!`.zebra)
}

module.exports={saludo01, saludo02}