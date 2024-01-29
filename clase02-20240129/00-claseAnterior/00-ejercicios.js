// ejemplo 1
let numero1=104;

const suma5=(numero)=>{
    let agrega=5;
    return numero+agrega; // 109
}

suma5(numero1);
console.log(numero1); //104
numero1=suma5(numero1)
console.log(numero1); //109

// ejemplo 2
// let nombre1='Diego';
// let cantLetras=0;

// const cuentaCaracteres=(palabra)=>{
//     let cantLetras=palabra.length;
//     return cantLetras;
// }

// cantLetras=cuentaCaracteres(nombre1)
// console.log(cantLetras)