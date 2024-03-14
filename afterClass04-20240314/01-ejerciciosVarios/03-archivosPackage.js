const fs=require("fs")
const {join} = require("path")
const path = require("path")

console.log(__dirname)
// "./packaje.json"
const rutaPackageJSON=join(__dirname, "package.json")
console.log(rutaPackageJSON)
const rutaInfo=join(__dirname, "info.json")

let info={}
fs.promises.readFile(rutaPackageJSON, {encoding:"utf-8"})
    .then(datosLeidos=>{
        info={
            contenidoStr:datosLeidos,
            contenidoObj:JSON.parse(datosLeidos),
            size:fs.statSync(rutaPackageJSON).size
        }

        fs.promises.writeFile(rutaInfo, JSON.stringify(info, null, 5))
            .then(()=>{
                console.log("Archivo info generado...!!!")
            })
    })