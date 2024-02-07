const fs=require("fs")

let rutaArchivo="./archivos/archivoPromesas.txt"
let texto3=`
“Debe trabajar el hombre
Para ganarse su pan;
Pues la miseria, en su afán
De perseguir de mil modos,
Llama a la puerta de todos
Y entra en la del haragán”.

“Muchas cosas pierde el hombre
Que a veces la vuelve a hallar;
Pero los debo enseñar,
Y es güeno que lo recuerden:
Si la vergüenza se pierde,
Jamás se la vuelve a encontrar”.

José Hernandez - fragmento del Martin Fierro`

// fs.promises.writeFile(rutaArchivo, texto3, {encoding:"utf-8"})
// fs.promises.writeFile(rutaArchivo, texto3)
//     .then(()=>{
//         console.log("archivo generado...!!!")
//         fs.promises.readFile(rutaArchivo, {encoding:"utf-8"})
//             .then(datosDelArhivo=>{
//                 console.log(datosDelArhivo)
//                 // append  .then( unlink etc...)
//             })
//     })

// fs.promises.writeFile(rutaArchivo, texto3)
//     .then(()=>{
//         console.log("archivo generado...!!!")
//         return fs.promises.readFile(rutaArchivo, {encoding:"utf-8"})
//     })
//     .then(datosDelArhivo=>{
//         console.log(datosDelArhivo)
//         return fs.promises.appendFile(rutaArchivo, "\n\nEditorial Alfaguara")
//     })
//     .then(()=>{
//         console.log("Se agregó la editorial")
//         setTimeout(() => {
//             fs.promises.unlink(rutaArchivo)
//                 .then(()=>{
//                     console.log("Archivo eliminado...!!!")
//                 })
//         }, 2000);
//     })

const app=async()=>{
    await fs.promises.writeFile(rutaArchivo, texto3)
    let datosDelArhivo=await fs.promises.readFile(rutaArchivo, {encoding:"utf-8"})
    console.log(datosDelArhivo)
    await fs.promises.appendFile(rutaArchivo, "\n\nEditorial Alfaguara")
    console.log("Editorial agregada")
    setTimeout(async() => {
        await fs.promises.unlink(rutaArchivo)
        console.log("Archivo eliminado...!!!")
            // .then(()=>{
            //     console.log("Archivo eliminado...!!!")
            // }) 
        }, 2000);
}

app()



