import { Router } from 'express';
export const router=Router()

router.get('/:id([0-9]+)',(req,res)=>{

    let {id}=req.params
    console.log(id, typeof id)

    res.setHeader('Content-Type','application/json')
    res.status(200).json({id})
})

router.get('/:nombre([a-z]+)',(req,res)=>{

    let {nombre}=req.params

    res.setHeader('Content-Type','application/json')
    res.status(200).json({nombre})
})

let errores={
    a:"error datos", 
    b:"error hardware",
    c:"error de seguridad"
}

router.param("codigo", (req, res, next, codigo)=>{
    // let {codigo}=req.params

    let error="Error indeterminado"
    if(errores[codigo]){
        error=errores[codigo]
    }
    req.errorDescrip=error
    next()
})

router.get("/errores/:codigo", (req, res)=>{

    // let {codigo}=req.params

    // let error="Error indeterminado"
    // if(errores[codigo]){
    //     error=errores[codigo]
    // }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:req.errorDescrip});
})
router.get("/errores/:nombre/:codigo", (req, res)=>{

    let {nombre}=req.params

    // let error="Error indeterminado"
    // if(errores[codigo]){
    //     error=errores[codigo]
    // }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:req.errorDescrip, reportadoPor: nombre});
})

router.get("*", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(404).json({error:`error 4040 | not found`})
})