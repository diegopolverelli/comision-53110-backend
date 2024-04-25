import {Command, Option} from "commander"

let programa=new Command()

programa.option("-p, --port <PORT>", "Puerto de escucha del server", 3000)
programa.option("-d, --debug", "Activa el mode DEBUG")
programa.option("-c, --colores [colores...]", "Listado de colores", ["red", "blue"])
programa.requiredOption("-u --user <USUARIO>", "Usuario que corre el script")
programa.addOption(new Option("-m --mode <MODE>", "Modo de ejecución del Script").choices(["dev", "prod"]).default("dev"))

programa.allowUnknownOption()
programa.parse()
const opts=programa.opts()
console.log(opts)
console.log(`Puerto configurado: ${opts.port}`)

console.log(programa.args)

