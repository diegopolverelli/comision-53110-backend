const suma=(a, b)=>{
    return new Promise((res, rej)=>{   // resolve / reject
        if(typeof a!=="number" || typeof b!=="number"){
            rej(new Error("Solo se aceptan argumentos numéricos"))
        }

        res(a+b)
    })
}

// const multiplica=(a, b)=>{
//     return new Promise((res, rej)=>{   // resolve / reject
//         if(typeof a!=="number" || typeof b!=="number"){
//             rej(new Error("Solo se aceptan argumentos numéricos"))
//         }

//         res(a*b)
//     })
// }

// console.log(suma(8,7) + 10)
suma(8,7)
    .then(resultado=>{
        console.log(resultado + 10)
    })
    .catch(error=>{
        console.log(error.message)
    })

suma("Juan",7)
    .then(resultado=>{
        console.log(resultado + 10)
    })
    .catch(error=>{
        console.log(error.message)
    })
    .finally(()=>{
        console.log("Esto se ejecuta siempre... sea la promesa res o rej")
    })

// 5x6=30
suma(5, 5)
    .then(res1=>{
        suma(res1, 5)
            .then(res2=>{
                suma(res2, 5)
                    .then(res3=>{
                        suma(res3, 5)
                            .then(res4=>{
                                suma(res4, 5)
                                    .then(resFinal=>console.log("Promise Hell:",resFinal))
                            })
                    })
            })
    })

// 