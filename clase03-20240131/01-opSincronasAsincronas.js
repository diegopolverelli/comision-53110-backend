const fs=require('fs')

const suma=(a,b)=>a+b
const llamaSuma=()=>{
    console.log(suma(5,5))
}

// console.log("inicio")

// console.log("algo...")

// console.log("Va a iniciar el for...")
// console.time("Demora for:")
// for(let i=0; i<5_000_000_000; i++){
//     suma(4,4)
// }
// console.timeEnd("Demora for:")

// llamaSuma()

// console.log("fin")


fs.writeFile("archivo01.txt","prueba de archivo de texto", ()=>{
    console.log("Archivo generado...!!!")
})

setTimeout(() => {
    console.log("log a los 0seg...!!!")
}, 0);

setTimeout(() => {
    console.log("log a los 3seg...!!!")
}, 3000);

console.log("inicio")

console.log("fin")