import { m1, m2 } from "../middlewares/varios.js";
import { HeroesManager } from "../dao/HeroesManager.js";
import { CustomRouter } from "./router.js";
import { upload } from "../middlewares/uploader.js";
import {join} from "path"
import __dirname from "../utils.js";


const heroesManager=new HeroesManager()

export class HeroesRouter extends CustomRouter{
    init(){
        this.get("/imagen/:name", ["public"], (req, res)=>{
            let {name}=req.params
            let heroes=heroesManager.getAll()
            let heroe=heroes.find(h=>h.name===name)
            if(!heroe){
                return res.badRequest(`No existe ${name}`)
            }

            if(!heroe.imagen || !heroe.imagen?.filename){
                return res.badRequest(`El  heroe ${name} no tiene imagen`)
            }

            res.setHeader('Content-Type', heroe.imagen.mimetype);
            return res.status(200).sendFile(join(__dirname, "uploads", heroe.imagen.filename));
        })

        this.get("/saludo", ["public"], (req, res)=>{
            console.log(lalalalalal)
            res.success("Hola...!!!")
        })

        this.get("/prueba", ["public"], (req, res)=>{
            res.success("Router Heroes - PRUEBA...!!!")
        })

        this.get("/", ["usuario", "premium"], m1, m2, (req, res)=>{

            let heroes=heroesManager.getAll()

            // res.setHeader('Content-Type','application/json');
            // return res.status(200).json({payload:heroes});
            res.success(heroes)
        })

        this.post("/", ["admin", "usuario"], upload.single("imagen"), (req, res)=>{
            let {name, ...otrasProps}=req.body
            if(!name){
                // res.setHeader('Content-Type','application/json');
                // return res.status(400).json({error:``})
                res.badRequest("Complete al menos la prop. name")
            }

            // otras validaciones

            let imagen=undefined
            if(req.file){
                imagen=req.file
            }

            let nuevoHeroe=heroesManager.create({name, ...otrasProps, imagen})
            res.successCreate("Heroe generado...!!!", nuevoHeroe)
        })
    }
}