// const contador=0
// contador++
// contador++
// contador++
// contador++

// // ...

// contador=900

// // ...

// console.log(contador)

let contador01= (function(){
    let contador=0

    function incrementar(){
        contador++
    }

    function verContador(){
        return contador
    }

    return {incrementar, verContador}

})()

contador01.incrementar();
contador01.incrementar()
contador01.incrementar()
contador01.incrementar()
console.log(contador01.verContador());

(()=>{
    console.log("hola")
})();

((a,b)=>{
    console.log(a+b)
})(7,3);

const suma=(a,b)=>{
    console.log(a+b)
}

suma(7,3)

function suma1(a,b){
    console.log(a+b)
}

suma1(7,3)




