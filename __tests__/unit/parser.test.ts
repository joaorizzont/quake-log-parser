
import Parser from '../../src/parser/parser'
import fs from 'fs'
import request from 'supertest'
import Server from '../../src/server'


const server: Server = Server.newInstance()


// variaveis para os testes ------------------
const pathLog: string = 'C:/www/quake-log-parser/src/assets/games.reduce.log'
const invalidPathLog: string = 'C:/www/quake-log-parser/src/assets/games.Invalidreduce.log'

const deployPath: string = `${__dirname}/assets/parsed.test.txt`;
const invalidDeployPath: string = `${__dirname}/assets/parsedInvalid.test.txt`;

var result: IGameInfo;
// -------------------------------------------


//testes ------------------------------------
beforeAll(async () => {

    //Teste para Parser com caminho invalido
    await Parser.Parse(invalidPathLog, invalidDeployPath, (res: IGameInfo, err?: Error) => {
        expect(res == null).toBe(true)
        expect(err?.message).toBe(`ENOENT: no such file or directory, open '${invalidPathLog}'`)
    })

    //resetando os valores dentro do parser
    Parser.restValues()

    //Teste para Parser com caminho valido
    await Parser.Parse(pathLog, deployPath, (res: IGameInfo, err?: Error) => {
        result = res
        expect(res != null).toBe(true)
        expect(err == undefined).toBe(true)
    })
})

afterAll(() => {
    fs.unlink(deployPath, (err) => {
        expect(err).toBe(null);
    })
});

describe('Parser', () => {

    it('Arquivo parsed.txt deve existir em __test__/assets', () => {
        const exists: boolean = fs.existsSync(deployPath);
        expect(exists).toBe(true)
    })

    it('O resultado deve ter vindo != undefined do callback enviado para funçao Parse', () => {
        expect(result != undefined).toBe(true)
    })
})

describe('Server', () => {

    it('Deve retornar codigo 200 e valores validos', async () => {

        //Pega o primeiro jogo existente nos resultados
        const gameName: any = Object.keys(Parser.result)[0];

        expect(gameName != undefined).toBe(true)

        const response = await request(server.getApp())
            .get(`/${gameName}`);

        expect(response.body).toHaveProperty("total_kills");
        expect(response.body).toHaveProperty("players");
        expect(response.body).toHaveProperty("kills");
        expect(response.body).toHaveProperty("kills_by_means");
    })

    it('Deve retornar codigo 404 com mensagem de erro', async () => {

        const response = await request(server.getApp())
            .get(`/game-inexistente`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Game_id não encontrado');
    })

})


interface IGameInfo {
    total_kills: number,
    players: string[],
    kills: Object[],
    kills_by_means: Object[],
}