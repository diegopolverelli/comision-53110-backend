import { heroesService } from "../services/heroes.service.js";

export const getAllHeroes=async (req, res)=>{

    // let heroes="Todos los heroes"
    let heroes=await heroesService.getAllHeroes()

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({heroes});

}


export const createHeroes=async (req, res)=>{

    // VALIDACIONES...!!!
    // let nuevoHeroe="Heroe creado OK"
    try {
        let nuevoHeroe=await heroesService.crearHeroe(req.body)
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({nuevoHeroe});
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }


}