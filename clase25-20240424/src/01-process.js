import fs from "fs"

console.log("cwd():",process.cwd())
console.log("pid:",process.pid)
console.log("version node:",process.version)
console.log("SO:",process.platform)
console.log("variables de entorno:", process.env)
console.log("path:", process.env.path)
console.log("path:", process.env.PRUEBA_PORT)
// console.log(process)
console.log("argumentos CLI:", process.argv)


