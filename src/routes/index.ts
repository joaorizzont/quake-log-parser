import { Router } from 'express'

import BaseController from '../controllers/BaseController'
const router: Router = Router()

//initializing
const baseController = new BaseController()
// ---------

router.get('/:game_id', baseController.getGameById)

export default router