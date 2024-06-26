import Users from "../../../src/dao/Users.dao.js";
import mongoose from "mongoose";
// import Assert from "assert"
import {expect, should} from "chai"
import {describe, it} from "mocha"

should()

try {
    await mongoose.connect('mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase40')
} catch (error) {
    console.log(error.message)
    process.exit()
}

// const assert=Assert.strict

describe("Pruebas al DAO de Users usando CHAI", function(){
    
    this.timeout(8000)  // x defecto es de 2000 ms

    // analizar si requiren befere, after, beforeEach, etc... 
    before(function(){
        this.userDAO=new Users()
    })

    beforeEach(async()=>{
        await mongoose.connection.collection("users").deleteMany({email:"test20240624@test.com"})
    })

    it("El método get del DAO retorna un arreglo de usuarios", async function(){
        let resultado=await this.userDAO.get()
        // let resultado=100
        // resultado=[1,2,3,4]
        // console.log(resultado)

        // assert.equal(Array.isArray(resultado), true)
        expect(Array.isArray(resultado)).to.be.equal(true)
        expect(Array.isArray(resultado)).to.be.true
        if(Array.isArray(resultado) && resultado.length>0){
            // assert.ok(resultado[0]._id)
            expect(resultado[0]._id).to.be.ok
            expect(resultado[0]).to.have.property("_id")
            // assert.ok(resultado[0].email)
            expect(resultado[0]).to.have.property("email")
            resultado[0].should.have.property("email")
            // console.log(Object.keys(resultado[0].toJSON()))
            // assert.equal(Object.keys(resultado[0].toJSON()).includes("email"), true)
            expect(Object.keys(resultado[0].toJSON()).includes("email")).to.be.eq(true)
        }
    })

    it("El método save permite grabar un user en DB", async function(){
        let mockUser={
            first_name:"Juan", last_name:"Lopez", email:"test20240624@test.com", password:"123"
        }

        let resultado=await mongoose.connection.collection("users").findOne({email:"test20240624@test.com"})
        // assert.equal(resultado, null)
        expect(resultado).to.be.equal(null)
        expect(resultado).to.be.null

        resultado=await this.userDAO.save(mockUser)
        // console.log(resultado)
        // assert.ok(resultado._id)
        expect(resultado._id).exist
        expect(resultado._id).to.be.ok
        // console.log(Object.keys(resultado))
        expect(resultado.toJSON()).to.haveOwnProperty("_id")

        resultado=await mongoose.connection.collection("users").findOne({email:"test20240624@test.com"})
        // assert.ok(resultado._id)
        expect(resultado._id).to.be.ok

        // assert.equal(resultado.email, "test20240624@test.com")
        expect(resultado.email).to.be.equal("test20240624@test.com")


    })

    // it("El método save permite grabar un user en DB, y el usuario retorna con una property pets, de tipo array sin datos", async function(){
    //     let mockUser={
    //         first_name:"Juan", last_name:"Lopez", email:"test20240624@test.com", password:"123"
    //     }

    //     let resultado=await this.userDAO.save(mockUser)
    //     // console.log(resultado)
    //     assert.ok(resultado.pets)
    //     assert.equal(Array.isArray(resultado.pets), true)
    //     assert.equal(resultado.pets.length, 0)

    // })

})// fin describe