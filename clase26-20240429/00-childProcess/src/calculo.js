process.on("message", mensaje=>{
    console.log(`Soy el proceso con id ${process.pid}, y recibi este mensaje: "${mensaje}". Inicio calculo...!!!`)
    console.time("Demora proceso:")
    let resultado=0

    for(let i=0; i<1_000_000_000; i++){
        resultado+=Math.floor(Math.random()*(10)+1)      // Math.floor(Math.random()*(cantNrosAGenerar)+aPartirDelNro)
    }

    console.timeEnd("Demora proceso:")
    // return resultado 
    process.send(resultado)
})