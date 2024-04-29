import { Router } from 'express';
import { createHeroes, getAllHeroes } from '../controller/heroes.controller.js';
export const router=Router()

router.get('/', getAllHeroes)
router.post("/", createHeroes)