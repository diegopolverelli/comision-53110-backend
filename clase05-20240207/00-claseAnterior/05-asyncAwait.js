const suma=(a, b)=>{
    return new Promise((res, rej)=>{   // resolve / reject
        if(typeof a!=="number" || typeof b!=="number"){
            rej(new Error("Solo se aceptan argumentos numéricos"))
        }

        res(a+b)
    })
}

const multiplica=(a, b)=>{
    return new Promise((res, rej)=>{   // resolve / reject
        if(typeof a!=="number" || typeof b!=="number"){
            rej(new Error("Solo se aceptan argumentos numéricos"))
        }

        res(a*b)
    })
}


// (3x4 + 5x3)=27
const entorno=async()=>{
    let res1=await multiplica(3,4)
    let res2=await multiplica(5,3)
    let resFinal=await suma(res1,res2)
    console.log(resFinal)
}

// entorno()

const entorno2=async function(){
    let res1=await multiplica(3,4)
    let res2=await multiplica(5,3)
    let resFinal=await suma(res1,res2)
    console.log(resFinal)
}

// entorno2()

async function entorno3(){
    try {
        let res1=await multiplica(3,4)
        let res2=await multiplica(5,3)
        let resFinal=await suma(res1,res2)
        console.log(resFinal)
        
    } catch (error) {
        console.log(error.message)
    }

    return `Resultado de la funcion entorno3...!!!`
}

// entorno3()

async function entorno4(){
    try {
        let res1=await multiplica(3,"pedro")
        let res2=await multiplica(5,3)
        let resFinal=await suma(res1,res2)
        console.log(resFinal)
        
    } catch (error) {
        console.log(error.message)
    }
}
// entorno4()

// console.log(entorno3())
entorno3()
    .then(res=>console.log(res))