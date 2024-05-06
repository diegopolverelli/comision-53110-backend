import { Router } from 'express';
import UsuariosController from '../controller/usuarios.controller.js';
export const router=Router()

// router.get('/',async(req,res)=>{

//     let usuarios=await usuariosDAO.getAll()

//     res.setHeader('Content-Type','application/json')
//     res.status(200).json({usuarios})
// });

// router.get('/', (req, res, next)=>{
//     console.log("middleware...!!!")
//     next()
// }, UsuariosController.getUsuarios)

// router.get('/', passport.authenticate("jwt", {sessions:false}, UsuariosController.getUsuarios)

router.get('/', UsuariosController.getUsuarios)
router.get("/:id", UsuariosController.getUsuarioById)
router.post("/", UsuariosController.create)