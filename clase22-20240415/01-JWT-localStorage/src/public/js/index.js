let btnLogin = document.getElementById('btnLogin')
let inputEmail = document.getElementById('email')
let inputPassword = document.getElementById('password')
let linkUsuarios= document.getElementById('linkUsuarios')

btnLogin.addEventListener("click", async (evt) => {
    evt.preventDefault()

    if (inputEmail.value.trim().length === 0 || inputPassword.value.trim().length === 0) {
        alert('Complete los datos...!!!')
        return
    }

    let body = {
        email: inputEmail.value.trim(),
        password: inputPassword.value.trim()
    }

    console.log(body)

    let respuesta = await fetch('/api/sessions/login', {
        method: 'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    })
    if(respuesta.status===200){
        let datos = await respuesta.json()
        console.log(datos)
        console.log(datos.token)
        localStorage.setItem('coderToken',datos.token)
    }else{
        alert(`${respuesta.status} - ${respuesta.statusText}`)
    }

})


linkUsuarios.addEventListener("click",async(evt)=>{
    evt.preventDefault()
    let token=localStorage.getItem('coderToken')
    console.log(token)

    let respuesta=await fetch('/api/sessions/usuario',{
        method:'get',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
        }
    })
    try {
        let info=await respuesta.json()
        console.log(info)
        
    } catch (error) {
        console.log(respuesta.status)
    }
})
