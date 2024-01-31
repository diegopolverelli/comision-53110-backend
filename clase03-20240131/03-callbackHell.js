const operar=(a, b, fnCallback)=>{
    if(typeof a!=="number" || typeof b!=="number"){
        return fnCallback(new Error("Solo se admiten argumentos numericos para a y b"))
    }
    return fnCallback(null, a, b)
}

// ??? (3x2 + 5x5) /10 + 100 = 103,1

let resultado=operar(100, 0, (e, a, b)=>{
    return operar(10, 0, (e, a, b)=>{
        return operar(5, 5, (e, a, b)=>{
            return operar(3,2, (e, a, b)=>{
                return a*b
            }) + a*b
        }) / a
    }) + a
})

/*
leerArchivo(()=>{
    hagoPeticion(()=>{
        procesar...
        grabarArchivo(()=>{
            ...
            enviarMail(()=>{
                if(err){
                    generarLogError(()=>{
                        ...
                    })
                }
            })
        })
    })
})
*/

console.log(resultado)