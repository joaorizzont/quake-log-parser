import { Request, Response } from 'express'

import Parser from '../parser/parser'

export default class BaseController {

  public getGameById(req: Request, res: Response): Response {
    try {

      const game_id: any = req.params.game_id

      const result = Parser.result[game_id];

      if (!result)
        return res.status(404).send({ message: "Game_id não encontrado" })

      return res.send({ result })
    } catch (err) {
      console.log(err.message)
      return res.status(400).send({ message: "Houve um erro ao buscar o jogo.", error: err.message })
    }
  }
}