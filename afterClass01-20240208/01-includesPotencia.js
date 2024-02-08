let numeros=[1,2,3,4,5]
let cuadrados=numeros.map(numero=>numero**2)

console.log("Reduce:", numeros.reduce((acumulador, valor)=>acumulador+=valor, 0))

// console.table({numeros, cuadrados})

// cuadrados=numeros.map((numero, indice, arregloCompleto)=>{
//     console.log(`en el indice ${indice} el valor es ${numero} / array completo: ${JSON.stringify(arregloCompleto)}`)
//     let resultado=numero**2
//     return resultado
// })
// console.table({numeros, cuadrados})

// forEach
// find
// findIndex
let nombres1=['Martina', 'Mariela', 'Sandra', 'Ana', 'Jimena', 'Marcelo', 'Julian', 'Ernesto']
let resultado=nombres1.find(nombre=>nombre==="Jimena")
console.log(resultado)
resultado=nombres1.find(nombre=>nombre==="Matilde")
console.log(resultado)
resultado=nombres1.findIndex(nombre=>nombre==="Jimena")
console.log(resultado)
// nombres1[resultado]="" // modifico
resultado=nombres1.findIndex(nombre=>nombre==="Matilde")
console.log(resultado)

// every
console.log("every numeros mayor 3",numeros.every(numero=>numero>3))
console.log("every numeros menor 100",numeros.every(numero=>numero<100))

let propiedadesValidasUsuario=["nombre", "apellido", "edad", "email"]
const modificaUsuario=(idUsuario, datos={})=>{
    let propiedadesQueQuieroModificar=Object.keys(datos)
    let ok=propiedadesQueQuieroModificar.every(prop=>propiedadesValidasUsuario.includes(prop))
    if(!ok){
        console.log("ESTA INTENTANDO MODIFICAR UN DATO ERRONEO...!!! Datos habilidatos para modificar: ",JSON.stringify(propiedadesValidasUsuario))
        return 
    }else{
        console.log("Se realizaría la modificacion...!!!")
        // con findIndex 
        // let indiceUsuario=usuarios.findIndex(u=>u.id===idUsuario)
        // if(indiceUsuario!==-1){
            // usuario inexistente
            // return 
        // }
        // usuario[indiceUsuario]={
        //     ...usuario[indiceUsuario],
        //     ...datos,
        //     id:idUsuario
        // }

    }

    let valores=Object.values(datos)
    let entradas=Object.entries(datos)

    console.log("propiedadesQueQuieroModificar:",propiedadesQueQuieroModificar)
    console.log("valores:",valores)
    console.log("entradas:",entradas)
}

modificaUsuario(100, {nombre:"Juan", colorDePelo:"negro", peso: 90})
modificaUsuario(101, {nombre:"Juan", apellido:"Lopez"})


let prueba="casa"





// let numero=10
// let cuadrado=Math.pow(numero, 2)
// console.log(cuadrado)
// cuadrado=numero**2
// console.log(cuadrado)


let nombres=['Martina', 'Mariela', 'Sandra', 'Ana', 'Jimena', 'Marcelo', 'Julian', 'Ernesto']
// console.log(nombres.includes("Ana"))
// console.log(nombres.includes("Matilde"))

