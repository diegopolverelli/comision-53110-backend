// alert("hola")
let nombre=prompt("Ingrese su nombre")
document.title=nombre
const socket=io()

socket.on("saludo", (datos)=>{
    console.log(`${datos.emisor} dice: "${datos.mensaje}"`)
    if(nombre.trim().length>0){
        socket.emit("id", nombre)
    }
})


socket.on("nuevoUsuario", nombre=>{
    console.log(`El server avisa que se ha conectado ${nombre}`)
})

socket.on("temperatura", temperatura=>{
    console.log(temperatura)
    let divTemperatura=document.getElementById("temperatura")
    divTemperatura.innerHTML=`Temperatura actual: ${temperatura}°`
})

socket.on("nuevoPersonaje", nuevoPersonaje=>{
    console.log(nuevoPersonaje)
})