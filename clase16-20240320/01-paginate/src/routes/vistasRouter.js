import { Router } from 'express';
import { usuariosModelo } from '../model/usuariosModel.js';
export const router=Router()

router.get('/usuarios',async(req,res)=>{

    // let usuarios=await usuariosModelo.find().lean()
    // let usuarios=await usuariosModelo.paginate()

    let {pagina}=req.query
    if(!pagina){
        pagina=1
    }

    let {
        docs:usuarios,
        totalPages, 
        prevPage, nextPage, 
        hasPrevPage, hasNextPage
    } = await usuariosModelo.paginate({},{limit:10, page:pagina, lean:true})

    console.log(JSON.stringify(usuarios, null, 5 ))

    res.setHeader('Content-Type','text/html')
    res.status(200).render("usuarios",{
        usuarios,
        totalPages, 
        prevPage, nextPage, 
        hasPrevPage, hasNextPage
    })
})