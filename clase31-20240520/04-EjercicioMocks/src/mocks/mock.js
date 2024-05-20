import {fa, faker} from "@faker-js/faker"
export const generaUsuario=()=>{
    let nombre=faker.person.firstName()
    let apellido=faker.person.lastName()
    let email=faker.internet.email({firstName:nombre, lastName:apellido})
    let password=faker.internet.password({length:6})
    let dni=faker.number.int({min:10000000, max:65000000})
    return {
        nombre, apellido, email, password, dni
    }
}

// console.log(generaUsuario())
export const generaProducto=()=>{
    let id=faker.database.mongodbObjectId()
    let descrip=faker.commerce.product()
    let precio=faker.commerce.price({min:1300, max:7480})
    let stock=faker.number.int({min:0, max:800})
    return {
        id, descrip, precio, stock
    }
}

export const generaFactura=()=>{
    let nroComp="00"+faker.string.numeric({length:2, allowLeadingZeros:true})+"-"+faker.string.numeric({length:8, allowLeadingZeros:true})
    let fecha=faker.date.past({years:3})
    let cliente=generaUsuario()
    delete cliente.password
    let carrito=[]
    for(let i=0; i<faker.number.int({min:1, max:15}); i++){
        let producto=generaProducto()
        producto.cantidad=faker.number.int({min:1, max:100})
        carrito.push(producto)
    }
    let total=carrito.reduce((a, i)=>i.precio*i.cantidad,0)

    return{nroComp, fecha, cliente, carrito, total}
}