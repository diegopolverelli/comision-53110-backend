// import Persona from './Persona.js'

import Persona from "./Persona.js";
import {usuarios, f1 as suma, f2, Heroe} from "./varios.js"
import * as utilidades from './varios.js'

import Villano, {f2 as resta} from "./varios.js";

import fs from 'fs'
import {promises as fsConPromesas} from 'fs'
import path from 'path'

import __dirname from "./utils.js";

let ruta=path.join(__dirname, "archivos", "prueba01.txt")
fs.promises.writeFile(ruta, "prueba de texto...")
    .then(()=>console.log("Archivo 1 grabado...!!!"))

let persona01=new Persona("Juan", "Lopez")
console.log(persona01.saludo())

console.log(usuarios)
console.log(suma(5,5))
console.log(f2(100,20))

let heroe01=new Heroe("Batman", "Bruce Wayne")
console.log(heroe01.verIdentidad())

console.log(utilidades.usuarios)
let heroe02=new utilidades.Heroe("Superman", "Clark Kent")
console.log(heroe02.verIdentidad())


let villano01=new Villano("Joker", "-")
console.log(villano01)