import { Request, Response } from 'express'



export default class BaseController {

  public getGameById(req: Request, res: Response): Response {
    return res.send({ OK: true })
  }

}