import { Router } from 'express';
import HeroesManager from '../manager/HeroesManager.js'
export const router=Router()

const heroesManager=new HeroesManager()

router.get('/',(req,res)=>{

    // console.log(lalala)

    req.logger.silly("prueba log level silly")
    req.logger.debug("prueba log level debug")
    req.logger.info("prueba log level info")
    req.logger.warn("prueba log level warn")
    req.logger.error("prueba log level error")

    res.status(200).render('home')
})

router.get('/heroes',(req,res)=>{


    let heroes
    try {
        heroes=heroesManager.getHeroes()
    } catch (error) {
        req.logger.error(`Error al leer heroes: ${error.message}`)        
    }

    res.status(200).render('heroes', {
        heroes
    })
})