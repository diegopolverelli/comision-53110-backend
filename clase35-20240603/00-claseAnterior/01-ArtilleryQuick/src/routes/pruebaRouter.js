import { Router } from 'express';
export const router=Router()

let visitas=0
router.get("/", (req, res)=>{
    visitas++

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({visitas});
})

router.get('/op1',(req,res)=>{

    console.time("Demora operación:")
    let valor1=Math.floor(Math.random()*(100)+1)      // Math.floor(Math.random()*(cantNrosAGenerar)+aPartirDelNro)    
    let valor2=Math.floor(Math.random()*(100)+1)      // Math.floor(Math.random()*(cantNrosAGenerar)+aPartirDelNro)    
    let resultado=valor1+valor2

    if(valor1<30){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`error 400`})
    }

    if(valor1>90){
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`error 500`})
    }

    console.log(resultado)
    console.timeEnd("Demora operación:")

    res.setHeader('Content-Type','application/json')
    res.status(200).json({valor1, valor2, resultado})
})

let contadorOP2=0
router.get('/op2',(req,res)=>{

    console.time("Demora operación:")
    contadorOP2++
    let resultado=0
    for(let i=0;i<50_000_000;i++){
        let valor1=Math.floor(Math.random()*(100)+1)      // Math.floor(Math.random()*(cantNrosAGenerar)+aPartirDelNro)    
        resultado+=valor1
    }

    console.timeEnd("Demora operación:")

    res.setHeader('Content-Type','application/json')
    res.status(200).json({resultado, ejecucionesRuta: contadorOP2})
})