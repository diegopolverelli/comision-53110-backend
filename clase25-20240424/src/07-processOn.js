process.on("exit", code=>{
    if(code){
        console.log(`Se produjo un error...`, code)
    }

    console.log(`Script finalizando...`)
})

process.on("uncaughtException", error=>{
    console.log("ocurrion un error no contemplado:", error.message)
})

let contador=0
setInterval(() => {
    contador++
    console.log(contador)

    if(contador===7){
        process.exit()
    }
}, 1000);

setTimeout(() => {
    try {
        console.log(fafafa)
        
    } catch (error) {
        console.log(`Ocurrio un error controlado: `, error.message)
    }
}, 2000);

setTimeout(() => {
    console.log(pepepe)
        
}, 4000);

setTimeout(() => {
    console.log(pepepe)
        
}, 5000);

setTimeout(() => {
    console.log(pepepe)
        
}, 6000);
