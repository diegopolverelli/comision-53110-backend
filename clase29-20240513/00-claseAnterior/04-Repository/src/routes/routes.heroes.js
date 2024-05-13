import { Router } from 'express';
import {getHeroes} from '../controllers/heroesController.js';
export const router=Router()

router.get('/',getHeroes)