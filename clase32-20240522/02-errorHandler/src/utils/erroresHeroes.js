import os from "os"
export function argumentosHeroe(heroe){
    let {name, ...otros}=heroe
    return `Se han detectado args inválidos.
Argumentos requeridos:
    - name: tipo string. Se ingresó ${name}
Argumentos opcioneales:
    - alias, powers, publisher, team. Se ingresó ${JSON.stringify(otros)}

Fecha: ${new Date().toUTCString()}
Usuario: ${os.userInfo().username}
Terminal: ${os.hostname()}`
}