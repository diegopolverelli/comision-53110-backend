
export const getAllHeroes=async (req, res)=>{

    let heroes="Todos los heroes"

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({heroes});

}


export const createHeroes=async (req, res)=>{

    let nuevoHeroe="Heroe creado OK"

    res.setHeader('Content-Type','application/json');
    return res.status(201).json({nuevoHeroe});

}