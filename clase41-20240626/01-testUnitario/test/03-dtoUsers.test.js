import UserDTO from "../src/dto/User.dto.js";
import {expect} from "chai"
import {describe, it} from "mocha"

describe("Prueba sobre Users DTO", ()=>{
    
    // analizar si son necesarios los before, after, etc...

    it("Recibe un user con first_name y last_name y retorna uno con name, concatenación de first y last...", ()=>{
        let mockUser={
            first_name:"Juan", last_name:"Ordoñez"
        }

        let resultado=UserDTO.getUserTokenFrom(mockUser)
        expect(resultado).to.has.property("name").and.to.be.equal(mockUser.first_name+" "+mockUser.last_name)
        expect(resultado.name).to.be.ok
        expect(resultado.name).to.be.equal(mockUser.first_name+" "+mockUser.last_name)
    })

    it("Recibe un user retorna uno con igual mail al del ingresado", ()=>{
        let mockUser={
            first_name:"Juan", last_name:"Ordoñez"
        }

        let resultado=UserDTO.getUserTokenFrom(mockUser)
        // console.log(resultado)
        expect(resultado).to.has.property("email").and.to.be.equal(mockUser.email)

        mockUser={
            first_name:"Juan", last_name:"Ordoñez", email:"jordonez@test.com"
        }

        resultado=UserDTO.getUserTokenFrom(mockUser)
        // console.log(resultado)
        expect(resultado).to.has.property("email").and.to.be.equal(mockUser.email)
    })
})