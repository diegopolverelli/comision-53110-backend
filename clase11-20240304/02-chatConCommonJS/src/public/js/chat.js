// alert("hola")
Swal.fire({
    title:"Identifiquese",
    input:"text",
    text:"Ingrese su nickname",
    inputValidator: (value)=>{
        return !value && "Debe ingresar un nombre...!!!"
    },
    allowOutsideClick:false
})
.then(datos=>{
    console.log(datos)
    let nombre=datos.value
    document.title=nombre

    let inputMensaje=document.getElementById("mensaje")
    let divMensajes=document.getElementById("mensajes")
    inputMensaje.focus()

    const socket=io()

    socket.emit("presentacion", nombre)

    socket.on("historial", mensajes=>{
        mensajes.forEach(m=>{
            divMensajes.innerHTML+=`<div class="mensaje"><strong>${m.nombre}</strong> dice: <i>${m.mensaje}</i></div><br>`
        })
    })

    socket.on("nuevoUsuario", nombre=>{
        Swal.fire({
            text:`${nombre} se ha conectado...!!!`,
            toast:true,
            position:"top-right"
        })
    })

    socket.on("nuevoMensaje", (nombre, mensaje)=>{
        divMensajes.innerHTML+=`<div class="mensaje"><strong>${nombre}</strong> dice: <i>${mensaje}</i></div><br>`
    })

    socket.on("saleUsuario", nombre=>{
        divMensajes.innerHTML+=`<div class="mensaje"><strong>${nombre}</strong> ha salido del chat... :(</div><br>`
    })

    inputMensaje.addEventListener("keyup", e=>{
        e.preventDefault()
        // console.log(e, e.target.value)
        if(e.code==="Enter" && e.target.value.trim().length>0){
            socket.emit("mensaje", nombre, e.target.value.trim())
            e.target.value=""
            e.target.focus()
        }
    })



})


