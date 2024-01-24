
function suma(a, b){
    // console.log(a+b)
    return a+b
}

function saludar(){
    console.log("hola...!!!")
}

console.log(typeof suma)

// suma="sumar 2 numeros.. 2 o mas..."
console.log(typeof suma)

let resultado=suma(5, 4)
console.log(resultado)
console.log(suma(5, 4))
// saludar()

const suma1=function(a, b){ // funcion anonima
    return a+b
}

console.log(suma1(3,3))

// suma1="otra cosa"

// funcion arrow / funcion flecha
const sumaFlecha=(a, b)=>{
    // validaciones, otras operaciones, etc
    return a+b
}

console.log(sumaFlecha(5,6))

const sumaFlecha1=(a, b)=>a+b
console.log(sumaFlecha1(5,6))

const duplica=a=>a*2
console.log(duplica(100))

const triplica=a=>{
    return a*3
}
console.log(triplica(100))


const operar=(a, b, operacion)=>{
    return operacion(a, b)
}

console.log(operar(10, 12, (a,b)=>a+b)) // una funcion que se envía como argumento a otra funcion, se conoce como callback
console.log(operar(10, 12, function(a,b){
    return a+b
}))
