import { createHash } from "../src/utils/index.js";
import {expect} from "chai"
import {describe, it} from "mocha"
// import pepe from "pepe"

describe("Pruebas funcion hash", ()=>{

    // after, afterEach???

    it("si recibo un dato en texto plano, retorna un hash en formato bcrypt", async()=>{
        let password="passwordpassword"
        let resultado=await createHash(password)
        expect(resultado).not.to.be.equal(password)
        expect(resultado).to.have.length.greaterThan(20)
        expect(resultado.length).to.be.greaterThan(20)
        // console.log(resultado)
        expect(resultado.substring(0,4)).to.be.equal("$2b$")
    })

})

