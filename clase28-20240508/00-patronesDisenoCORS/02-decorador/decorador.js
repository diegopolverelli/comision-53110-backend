
// @decorador(parametro1, parametro2)  // forma habitual de encontrar decoradores (en frameworks)
const suma=(a,b)=>{
    return a+b
}

// console.log(suma(4,5))

const agregaLog=(fn)=>{
    return function(...params){
        // funcionalidad extre...
        console.log(`La funcion "${fn.name}" se ejecuto el ${new Date().toUTCString()}`)

        return fn.apply(this, params)
    }
}

const funcionDecorada=agregaLog(suma)
console.log(funcionDecorada(4,5))

