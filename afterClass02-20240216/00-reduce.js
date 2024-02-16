let numeros=[1,1,1,1,1]

let resultado
// resultado=numeros.reduce((acum, valor)=>acum+=valor*10,0)
// console.log(resultado)

// resultado=numeros.reduce((acum, valor)=>acum+=valor*10)
// console.log(resultado)




resultado=numeros.reduce((acum, valor, indice, arregloCompleto)=>{
    console.log(`recorriendo indice ${indice}, tiene valor ${valor}, acum=${acum} - arreglo inicial: ${arregloCompleto}`)
    return acum+=valor*10
},0)
console.log(resultado)

resultado=numeros.reduce((acum, valor, indice, arregloCompleto)=>{
    console.log(`recorriendo indice ${indice}, tiene valor ${valor}, acum=${acum} - arreglo inicial: ${arregloCompleto}`)
    return acum+=valor*10
})
console.log(resultado)