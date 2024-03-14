let resultado={}

for(let i=0; i<10_000; i++){
    let numero=Math.floor(Math.random()*20+1)
    if(resultado[numero]){
        resultado[numero]++
    }else{
        resultado[numero]=1
    }
}

console.log(resultado)

persona={
    nombre:"Juan"
}

if(persona.nombre){

}

if(persona["nombre"]){
    
}