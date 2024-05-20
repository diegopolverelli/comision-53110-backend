import {fakerES_MX as faker} from "@faker-js/faker"

console.log(faker.animal.dog())
console.log(faker.commerce.product())
console.log(faker.database.mongodbObjectId())
let nombre=faker.person.firstName("female")
console.log(nombre)
let apellido=faker.person.lastName()
console.log(apellido)
console.log(faker.person.fullName({firstName:nombre, lastName:apellido}))
console.log(faker.internet.email({firstName:nombre, lastName:apellido, provider:"hotmail.es"}))
console.log(faker.internet.password({length:8, memorable:true}))