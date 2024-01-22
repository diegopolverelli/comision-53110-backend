console.log("Prueba de script...!!!")
let heroes = ["ironman", "hulk", "thor"]

let div = document.createElement("div")
let divHtml = ''
heroes.forEach(heroe => {
    console.log(heroe)
    divHtml += `<p><strong>${heroe}</strong></p>`
})
div.innerHTML = divHtml
document.body.append(div)