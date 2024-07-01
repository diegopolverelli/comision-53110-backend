import {expect} from "chai"
import {describe, it} from "mocha"
import jwt from "jsonwebtoken"

import mongoose, { isValidObjectId } from "mongoose"
import supertest from "supertest"

const requester=supertest("http://localhost:8080")

const connDB=async()=>{
    try {
        await mongoose.connect(
            "mongodb+srv://backend53110:CoderCoder@cluster0.tkdyfo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        {
            dbName: "clase40"
        }
        )
        console.log("DB conectada...!!!")
    } catch (error) {
        console.log(`Error al conectar a DB: ${error}`)
    }
}
connDB()

describe("Prueba router sessions", function(){
    describe("Prueba circuito registro / login / current", function(){
        this.timeout(10000)
        this.cookie=""
        this.mockUser={
            first_name: "test", 
            last_name:"Test", 
            email:"test@test.com", 
            password:"123"
        }

        after(async()=>{
            await mongoose.connection.collection("users").deleteMany({email:this.mockUser.email})
        })

        it("La ruta /api/sessions/register permite dar de alta un usuario",async()=>{
            let {body}=await requester.post("/api/sessions/register").send(this.mockUser)
            // console.log(body)
            expect(body.status).to.be.equal("success")
            expect(isValidObjectId(body.payload)).to.be.true
        })

        it("La ruta /api/sessions/login, permite hacer el login de un usuario previamente registrado, y genera una cookie conteniendo un jwt con datos del usuario", async()=>{
            let {body, headers}=await requester.post("/api/sessions/login").send({email:this.mockUser.email, password: this.mockUser.password})

            // console.log({body})
            // console.log({headers})
            let cookieName=headers["set-cookie"][0].split("=")[0]
            let cookieValue=headers["set-cookie"][0].split("=")[1]
            cookieValue=cookieValue.split(";")[0]
            // console.log(cookieName)
            // console.log(cookieValue)
            // persona["nombre"]

            expect(body.status).to.be.equal("success")
            expect(body.message).to.be.equal("Logged in")
            expect(cookieName).to.be.equal("coderCookie")
            let user=jwt.decode(cookieValue)
            // console.log(user)
            expect(user.email).to.be.equal(this.mockUser.email)
            this.cookie=headers["set-cookie"][0]
        })

        it("La ruta /api/sessions/current, lee una cookie de nombre coderCookie generada en el login, y retorna el usuario del token", async()=>{
            let {body}=await requester.get("/api/sessions/current").set("Cookie", this.cookie)
            // console.log(body)
            expect(body.status).to.be.equal("success")
            expect(body.payload.email).to.be.equal(this.mockUser.email)


        })
    }) // fin describe circuito
}) // fin describe gral.