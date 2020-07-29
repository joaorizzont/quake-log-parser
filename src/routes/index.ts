import { Router } from 'express'

import BaseController from '../controllers/BaseController'
const router: Router = Router()

//initializing

const baseController = new BaseController()

// ---------


router.use('/base', baseController.getGameById)

export default router