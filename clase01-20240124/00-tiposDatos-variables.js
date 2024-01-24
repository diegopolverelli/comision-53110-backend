console.log(10, typeof 10)
console.log(10n, typeof 10n)
console.log("Me llamo Diego", typeof "Me llamo Diego")
console.log(true, typeof true)
console.log(10n + BigInt(10))
console.log(Number.MAX_SAFE_INTEGER)
console.log(Number.MIN_SAFE_INTEGER)

console.log([1,2,3,4,5], typeof [1,2,3,4,5])
console.log({id:100, nombre:"Juan Manuel", edad:31}, typeof {id:100, nombre:"Juan Manuel", edad:31} )


let user = { name: 'John', edad:19, email:"john@test.com" };

let admin = user;

admin.name = 'Pete'; // cambiado por la referencia "admin"

console.log(user.name); // 'Pete', los cambios se ven desde la referencia "user"

let usuario2={...user}  // en este contexto los ... significan "operador spread"
                        // el operador spread rompe la referencia...

usuario2.name="Micaela"

console.table({user, usuario2})

let usuario3={name:user.name}

let numeros=[1,2,3,4]
let numeros2=[5,6,7,8]

let todosLosNumeros=[...numeros, ...numeros2]
console.log(todosLosNumeros)

let sumandos=[10,20,5,14,180]

const suma=(a, b)=>a+b
console.log(suma(9,4))


console.log(suma(...sumandos))

// ... operador rest
const suma1=(a, b, ...restoDeLosArgumentos)=>{ // en este contexto los ... indican operador rest
    console.log({a, b, restoDeLosArgumentos})
}

suma1(10,11,12,13,14,15,16,17,18)
suma1(100)
