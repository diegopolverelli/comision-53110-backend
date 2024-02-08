// Finally:
const sumaComPromesa=(a,b)=>{
    return new Promise((res,rej)=>{
        if(typeof a!=="number" || typeof b!=="number") rej('error...')
        res(a+b)
    })
}

// ...

// operador Spread:
let defensa={
    primerCentral:'Romero',
    lateralIzquierdo:'Montiel',
    lateralDerecho:'Tagliafico',
    segundoCentral:'Otamendi'
}

let medio={
    nro5:'Paredes',
    nro8:'DePaul',
    nro7:'DiMaria',
    nro14:'Enzo'
}

let ataque={
    el10:'Lio',
    el9:'Julian',
}

const equipo={
    arquero:"Martinez",
    // el10:ataque.el10,
    // el9:ataque.el9
    ...defensa,
    ...medio,
    ...ataque,
    lateralDerecho:"Acuña"
}

// console.log(equipo)


let numeros=[1,2,3,4]
let numeros2=[5,6,7,8]
let todosLosNumeros=[...numeros, ...numeros2] 
// console.log(todosLosNumeros)

const suma=(a, b, c, d)=>{
    return a+b+c+d
}
// console.log(suma(1,2,3,4))
// console.log(suma(...numeros))
// console.log(suma(...numeros2))




// operador Rest: ...
const imprime=(a, b, ...otrosArgumentosQueLleguen)=>{
    console.log(a, b, otrosArgumentosQueLleguen)
}
imprime(1,2,3,4,5,6, {name:"Batman"}, false, "Pedro")

const sumaVarios=(...sumandos)=>{ //op rest
    // console.log(sumandos)
    let resultado=0
    sumandos.forEach(numero=>{
        resultado+=numero
    })
    return resultado
}

let sumandos=[10,20,30,40,50,60]
// console.log(sumaVarios())
// console.log(sumaVarios(1,2))
// console.log(sumaVarios(1,2,3,4,5,100))

// console.log(sumaVarios(...sumandos)) // op spread


// desestructuracion:
// console.log(equipo.arquero)
// let arquero=equipo.arquero
// let el10=equipo.el10

let {arquero, el10, lateralDerecho, dt} = equipo
console.log(arquero, el10, lateralDerecho, dt)

let {arquero:arquero2, el10:el10_2, lateralDerecho:lateral2, dt:dt2} = equipo
console.log(arquero2, el10_2, lateral2, dt2)


const varios=()=>{
    let pi=3.14
    let numerosPrimos=[2,3,5,7,11,13,17,19,23]
    function suma(a,b){
        console.log(a+b)
    }
    return {
        pi,
        numerosPrimos,
        suma,
        abc:90000
    }
}

let pi2=3.14

let {pi, abc}=varios()
console.log(pi, abc)

try {
    let {pi:numeroPI}=varios()
    console.log("numeroPI, dentro bloque try / catch:",numeroPI)
} catch (error) {
    console.log(error)
}

// console.log(numeroPI)




let heroes=["Superman", "Hulk", "Black-Widow", "Mujer Maravilla", "Batman"]
let [h1, h2, h3]=heroes
console.log(h1, h2, h3)
let [primerh, segundoh, tercerh]=heroes
console.log(primerh, segundoh, tercerh)
let [dc1, , , dc2]=heroes
console.log(dc1, dc2)

