let texto=`     

No renuncio a nada, simplemente hago lo que puedo para que las cosas me renuncien a mi.    
          Rayuela, Julio Cortazar                      
          
          `

// console.log(`***${texto}***`)
// console.log(`***${texto.trim()}***`)
// console.log(texto.length)
// console.log(texto.trim().length)
// texto="     "
// console.log(texto.length)


let arrayAnidado=[1,2,3,[4,5,6],7,8,[9],10,11,12]
// console.log(arrayAnidado)
// console.log(arrayAnidado.length)
// console.log(arrayAnidado.flat())
// console.log(arrayAnidado.flat().length)



arrayAnidado=[1,2,3,[4,5,6],7,8,[9,[10,11,12],13,14,[15,[16,17,18]]],19,20]
console.log(arrayAnidado.flat(9))
console.log(arrayAnidado.flat(9).length)

