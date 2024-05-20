// export const suma=(a, b, c, d)=>{
//     if(!a || !b) return 0
//     if(typeof a!="number" || typeof b!="number") return null
//     return a+b+c+d
// }

// export const suma=(...sumandos)=>{   // ... es aquí el operador rest
//     if(sumandos.length===0) return 0
    
//     for(let i=0; i<sumandos.length; i++){
//         if(typeof sumandos[i]!="number"){
//             return null
//         }
//     }

//     let resultado=0
//     for(let i=0; i<sumandos.length; i++){
//         resultado+=sumandos[i]
//     }

//     return resultado
// }

// export const suma=(...sumandos)=>{   // ... es aquí el operador rest
//     if(sumandos.length===0) return 0
    
//     let resultado=0
//     for(let i=0; i<sumandos.length; i++){
//         if(typeof sumandos[i]!="number"){
//             return null
//         }
//         resultado+=sumandos[i]
//     }

//     return resultado
// }

export const suma=(...sumandos)=>{   // ... es aquí el operador rest
    if(sumandos.length===0) return 0
    if(!sumandos.every(n=>typeof n==="number")) return null
    return sumandos.reduce((a, v)=>a+=v, 0)    
}