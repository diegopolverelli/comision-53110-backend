import { Router } from 'express';
import { createNegocio, getNegocioById, getNegocios } from '../controllers/negocios.Controller.js';
export const router=Router()

router.get('/', getNegocios)
router.get("/:nid", getNegocioById)
router.post("/", createNegocio)