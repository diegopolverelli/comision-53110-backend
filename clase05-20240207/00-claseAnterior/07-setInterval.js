let contador=0
let intervalo01=setInterval(() => {
    contador++
    if(contador<4){
        console.log(contador)

    }else{
        clearInterval(intervalo01)
    }
}, 1000);

let contador2=0
let intervalo02=setInterval(() => {
    contador2++
    if(contador2<8){
        console.log(contador2)

    }else{
        clearInterval(intervalo02)
    }
}, 500);