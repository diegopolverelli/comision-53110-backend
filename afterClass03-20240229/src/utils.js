const path=require("path")
const rutaCursos=path.join(__dirname, "data", "cursos.json")
const rutaAlumnos=path.join(__dirname, "data", "alumnos.json")

module.exports={rutaAlumnos, rutaCursos}