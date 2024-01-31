
let numeros=[1,2,3,4,5]
let cuadrados=numeros.map(a=>a**2)
console.table({numeros, cuadrados})

function calculaCuadrados(a){
    return a*a
}

cuadrados=numeros.map(calculaCuadrados)
console.table({numeros, cuadrados})

cuadrados=numeros.map(a=>{
    return Math.pow(a, 2)
    // a**2
    // return "pedro"
})
console.table({numeros, cuadrados})

const miMap=(arreglo=[], fnCallback)=>{
    let resultado=[]

    for(let i=0; i<arreglo.length; i++){
        let valor=fnCallback(arreglo[i])
        resultado.push(valor)
    }

    return resultado
}

cuadrados=miMap(numeros, a=>a**2)
console.table({numeros, cuadrados})

const operar=(a, b, fnCallback)=>{
    if(typeof a!=="number" || typeof b!=="number"){
        return fnCallback(new Error("Solo se admiten argumentos numericos para a y b"))
    }
    return fnCallback(null, a, b)
}

console.log(operar(10, 5, (err, a,b)=>{
    if(err){
        return "Algo ocurrió...!!! ERROR...!!!"
    }else{
        return a*b
    }
}))

console.log(operar(10, "Camila", (err, a,b)=>{
    if(err){
        return "Algo ocurrió...!!! ERROR...!!!"
    }else{
        return a*b
    }
}))


console.log(operar(10, 5, (err, a,b)=>a/b))
console.log(operar(10, 5, (err, a,b)=>a+b))
console.log(operar(10, 5, (err, a,b)=>a-b))