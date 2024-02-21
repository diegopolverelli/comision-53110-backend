const PetManager = require('../managers/PetsManager');
const {join}=require("path")
// const path=require("path")
// const join2=require("path").join

const Router=require('express').Router;
const router=Router()

let rutaPets=join(__dirname, "..", "data", "pets.json")
const petManager=new PetManager(rutaPets)

router.get('/',(req,res)=>{

    let pets=petManager.getPets()

    res.setHeader('Content-Type','application/json')
    res.status(200).json({pets})
})

router.post('/',(req,res)=>{

    let {nombre}=req.body
    if(!nombre){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete el nombre`})
    }

    // otras validaciones... 

    let nuevaMascota=petManager.createPet(req.body)

    res.setHeader('Content-Type','application/json')
    res.status(201).json({nuevaMascota})
})


module.exports=router