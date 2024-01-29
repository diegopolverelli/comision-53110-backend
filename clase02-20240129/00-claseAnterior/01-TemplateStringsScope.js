
let nombre="Juan"

console.log(nombre)

// try {
//     // codigo...
// } catch (error) {
    
// }

for(let i=0; i<5;i++){
    let numero=0
    nombre="Carolina"
    console.log(numero)
}

console.log(nombre)
// console.log(numero)

let texto1="Curso programación Backend"
console.log(texto1)
texto1='Curso programación Backend - docente: '+nombre
console.log(texto1)
texto1='Curso programación Backend \n\n\t- docente: '+nombre
console.log(texto1)
texto1=`Curso programación Backend

    - docente: ${nombre}
    - el resultado de sumar 2 y 2 es ${2+2}
`
console.log(texto1)

const encabezado2=(texto, color="black", size=12)=>{
    return `<h2 style="color: ${color}; font-size: ${size}px;">${texto}</h2>`
}

console.log(encabezado2("Curso Programación Backend", "red", 32))





