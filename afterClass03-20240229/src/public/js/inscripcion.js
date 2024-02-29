// alert("hola")
const socket=io()

socket.on("nuevoCurso", datos=>{
    console.log(datos)
    let ulCursos=document.getElementById("cursos") 
    ulCursos.innerHTML+=`<li>${datos.descrip} <button onclick="inscribir('${datos.id}','${datos.descrip}')">Inscribir</button></li>`

    // window.location.href="http://localhost:3000/inscripcion"

})

const inscribir=async(idCurso, descrip)=>{
    let idAlumno=document.getElementById("idAlumno").innerHTML
    console.log({idCurso, descrip, idAlumno})
    let respuesta=await fetch("http://localhost:3000/prueba/"+idCurso+"/"+descrip, 
    {
        method:"post"
    })
    let datos=await respuesta.json()
    console.log(datos)
}