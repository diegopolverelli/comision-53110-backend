import { Router } from 'express';
import { createUsuario, getUsuarioById, getUsuarios } from '../controllers/usuarios.Controller.js';
export const router=Router()

router.get('/',getUsuarios)
router.get('/:uid',getUsuarioById)
router.post("/", createUsuario)