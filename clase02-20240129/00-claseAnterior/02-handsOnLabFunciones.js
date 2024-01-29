
const mostrarLista=(lista=[])=>{
    if(!Array.isArray(lista)){
        console.log(`El argumento no es de tipo array; es de tipo ${typeof lista}`)
        return
    }

    if(lista.length===0){
        console.log(`No se han ingresado elementos en la lista...!!!`)
        return 
    }

    lista.forEach(elemento=>{
        console.log(elemento)
    })

    console.log(`La lista tiene ${lista.length} elementos`)

}

// mostrarLista([1,2,3,4])
// mostrarLista(["Juan", "Laura"])
// mostrarLista([])
mostrarLista("Jimena")