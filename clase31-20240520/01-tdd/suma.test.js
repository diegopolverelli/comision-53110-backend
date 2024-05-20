import colors from "colors"
import { suma } from "./suma.js";

// console.log("hola".green)

console.time("Tiempo estimado de pruebas:")
let pruebas=0
let ok=0
let resultado, esperado, error;
let detalleError=[]

// ------------------
pruebas++
console.log(`Prueba ${pruebas}: la fn recibe 2 argumentos y retorna la suma de ambos`)
error=false
resultado=suma(5, 4)
esperado=9
if(resultado!==esperado){
    error=true
    detalleError.push(`Error prueba ${pruebas}: esperado: ${String(esperado).green}, se obtuvo: ${String(resultado).red}`)
}

resultado=suma(-10, 10)
esperado=0
if(resultado!==esperado){
    error=true
    detalleError.push(`Error prueba ${pruebas}: esperado: ${String(esperado).green}, se obtuvo: ${String(resultado).red}`)
}

resultado=suma(10000000, 20000000)
esperado=30000000
if(resultado!==esperado){
    error=true
    detalleError.push(`Error prueba ${pruebas}: esperado: ${String(esperado).green}, se obtuvo: ${String(resultado).red}`)
}

if(!error){
    ok++
    console.log(`${"√".green} - Prueba ${pruebas} correcta...!!!`)
}


// ------------------
pruebas++
console.log(`Prueba ${pruebas}: si la fn no recibe argumentos, devuelve 0`)
error=false
resultado=suma()
esperado=0
if(resultado!==esperado){
    error=true
    detalleError.push(`Error prueba ${pruebas}: esperado: ${String(esperado).green}, se obtuvo: ${String(resultado).red}`)
}

if(!error){
    ok++
    console.log(`${"√".green} - Prueba ${pruebas} correcta...!!!`)
}

// ------------------

pruebas++
console.log(`Prueba ${pruebas}: si la fn recibe argumentos no numéricos, devuelve null`)
error=false
resultado=suma(100, false)
esperado=null
if(resultado!==esperado){
    error=true
    detalleError.push(`Error prueba ${pruebas}: esperado: ${String(esperado).green}, se obtuvo: ${String(resultado).red}`)
}

resultado=suma(100, "juan")
esperado=null
if(resultado!==esperado){
    error=true
    detalleError.push(`Error prueba ${pruebas}: esperado: ${String(esperado).green}, se obtuvo: ${String(resultado).red}`)
}

if(!error){
    ok++
    console.log(`${"√".green} - Prueba ${pruebas} correcta...!!!`)
}
// ------------------

pruebas++
console.log(`Prueba ${pruebas}: si la fn recibe n argumentos numéricos, retorna la suma de todos ellos`)
error=false
resultado=suma(100, 200, 300)
esperado=600
if(resultado!==esperado){
    error=true
    detalleError.push(`Error prueba ${pruebas}: esperado: ${String(esperado).green}, se obtuvo: ${String(resultado).red}`)
}

resultado=suma(1, 2, 3, 4, 5)
esperado=15
if(resultado!==esperado){
    error=true
    detalleError.push(`Error prueba ${pruebas}: esperado: ${String(esperado).green}, se obtuvo: ${String(resultado).red}`)
}

if(!error){
    ok++
    console.log(`${"√".green} - Prueba ${pruebas} correcta...!!!`)
}
// ------------------



console.log(`Pruebas correctas: ${String(ok).green} / ${pruebas}`)
if(detalleError.length>0){
    console.log(`Pruebas inválidas:`)
    detalleError.forEach(e=>console.log(e))
}
console.timeEnd("Tiempo estimado de pruebas:")

console.log('\x1b[34m\x1b[1mPruebas concretadas...!!!\x1b[0m');
// console.log('\x1b[34m\x1b[1mPruebas concretadas...!!!');