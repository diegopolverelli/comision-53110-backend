import { m1, m2 } from "../middlewares/varios.js";
import { HeroesManager } from "./dao/HeroesManager.js";
import { CustomRouter } from "./router.js";

const heroesManager=new HeroesManager()

export class HeroesRouter extends CustomRouter{
    init(){
        this.get("/", m1, m2, (req, res)=>{

            let heroes=heroesManager.getAll()

            // res.setHeader('Content-Type','application/json');
            // return res.status(200).json({payload:heroes});
            res.success(heroes)
        })

        this.post("/", (req, res)=>{
            let {name, ...otrasProps}=req.body
            if(!name){
                // res.setHeader('Content-Type','application/json');
                // return res.status(400).json({error:``})
                res.badRequest("Complete al menos la prop. name")
            }

            // otras validaciones

            let nuevoHeroe=heroesManager.create({name, ...otrasProps})
            res.successCreate("Heroe generado...!!!", nuevoHeroe)
        })
    }
}