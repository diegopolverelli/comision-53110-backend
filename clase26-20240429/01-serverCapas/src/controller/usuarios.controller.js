import { isValidObjectId } from "mongoose"
import { UsuariosMongoDAO as UsuariosDAO } from "../dao/UsuariosMongoDAO.js"
// import { UsuariosMemoryDAO as UsuariosDAO } from "../dao/UsuariosMemoryDAO.js"

const usuariosDAO=new UsuariosDAO()

export default class UsuariosController{

    static getUsuarios=async(req,res)=>{

        let usuarios=await usuariosDAO.getAll()

        res.setHeader('Content-Type','application/json')
        res.status(200).json({usuarios})
    }

    static getUsuarioById=async(req,res)=>{

        let {id}=req.params
        if(!isValidObjectId(id)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ingrese un id de MongoDB válido`})
        }

        let usuario=await usuariosDAO.getOneBy({_id:id})

        res.setHeader('Content-Type','application/json')
        res.status(200).json({usuario})
    }

    static create=async(req,res)=>{
        let{nombre, email}=req.body
        if(!email){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`email es requerido`})
        }

        let existe
        try {
            existe = await usuariosDAO.getOneBy({email})
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
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ya existe un usuarios con email ${email}`})
        }

        // resto de validaciones aquí SIEMPRE en CONTROLLER...!!!

        try {
            let nuevoUsuario=await usuariosDAO.create({nombre, email})
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({nuevoUsuario});            
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
}