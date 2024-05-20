const suma=require("./suma.js").suma

describe("Prueba sobre la función suma()", ()=>{
    it("Si la fn recibe 2 args, retorna la suma de ambos", ()=>{
        expect(suma(4,5)).toBe(9)
        expect(suma(-4,5)).toBe(1)
        expect(suma(-400,500)).toBe(100)
    })

    it("Si no recibo args, retorna 0", ()=>{
        expect(suma()).toBe(0)
    })

    it("Si recibo args no numéricos, retorna null", ()=>{
        expect(suma(1, 2, "juan")).toBe(null)
        expect(suma(2, 3, false)).toBeNull()
    })

    it("Si recibo n args, retorna la suma de todos los args", ()=>{
        expect(suma(1,2,3,4,5)).toBe(15)
        expect(suma(1,1,1)).not.toBe(100)
        expect(suma(1,1,1)).toBe(3)
    })

})