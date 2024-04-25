console.log("argumentos CLI:", process.argv)

let [pathNode, pathScript, ...argumentos ]=process.argv

let indice
if(argumentos.includes("--nombre")){
    indice=argumentos.findIndex(e=>e==="--nombre")
    console.log(`Nombre ingresado x consola: ${argumentos[indice+1]}`)
}

if(argumentos.includes("--edad")){
    indice=argumentos.findIndex(e=>e==="--edad")
    console.log(`Edad ingresada x consola: ${argumentos[indice+1]}`)
}

if(argumentos.includes("--port")){
    indice=argumentos.findIndex(e=>e==="--port")
    console.log(`Puerto ingresada x consola: ${argumentos[indice+1]}`)
}
