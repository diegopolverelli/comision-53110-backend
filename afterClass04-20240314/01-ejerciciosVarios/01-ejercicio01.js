const objetos=[
    {
        manzanas:3,
        peras:2,
        carne:1,
        jugos:5,
        dulces:2
    },
    {
        manzanas:1,
        sandias:1,
        huevos:6,
        jugos:1,
        panes:4
    }
]

let resultado=[]
let cantidad=0
objetos.forEach(objeto=>{
    let claves=Object.keys(objeto)
    // console.log(claves)
    claves.forEach(clave=>{
        cantidad+=objeto[clave]
        if(!resultado.includes(clave)){
            resultado.push(clave)
        }
    })

})

console.log(resultado)
console.log(cantidad)

