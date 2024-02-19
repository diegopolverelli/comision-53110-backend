const Persona=require("./Persona")
const varios=require("./varios")
const Heroe=require("./varios").Heroe

const resta=require("./varios").f2

const fs=require("fs")
const fsConPromesas=require("fs").promises
const path=require("path")

let ruta=path.join(__dirname, "archivos", "prueba01.txt")
fs.promises.writeFile(ruta, "texto prueba...")
    .then(()=>console.log("archivo 1 grabado...!!!"))

fsConPromesas.writeFile("./archivos/prueba02.txt","otra prueba...")
    .then(()=>console.log("archivo 2 grabado...!!!"))


let persona01=new Persona("Juan", "Lopez")
console.log(persona01.saludo())

console.log(varios.usuarios)
console.log(varios.f1(5,5))

let heroe01=new varios.Heroe("Scarlet Witch", "Wanda Maximoff")
console.log(heroe01.verIdentidad())

let heroe02=new Heroe("Superman", "Clark Kent")
console.log(heroe02.verIdentidad())

console.log(resta(10,4))
