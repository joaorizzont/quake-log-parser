import { Request, Response } from 'express'

import Parser from '../parser/parser'

export default class BaseController {

  public getGameById(req: Request, res: Response): Response {
    try {

      const game_id: any = req.params.game_id

      const result = Parser.result[game_id];

      if (!result)
        return res.status(404).send({ message: "Game_id não encontrado" })

      const response = {
        total_kills: result['total_kills'],
        players: result['players'],
        kills: {},
        kills_by_means: {},
      }

      var killsValues = Object.values(result['kills']);
      var killsKeys = Object.keys(result['kills']);

      for (let i = 0; i < killsValues.length; i++)
        response.kills = { ...response.kills, [killsKeys[i] as any]: killsValues[i] }


      var kbmValues = Object.values(result['kills_by_means']);
      var kbmsKeys = Object.keys(result['kills_by_means']);

      for (let i = 0; i < kbmValues.length; i++)
        response.kills_by_means = { ...response.kills_by_means, [kbmsKeys[i] as any]: kbmValues[i] }


      return res.send(JSON.parse(JSON.stringify(response)))

    } catch (err) {
      console.log(err.message)
      return res.status(400).send({ message: "Houve um erro ao buscar o jogo.", error: err.message })
    }
  }
}