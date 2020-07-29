import fs from 'fs'
import util from 'util'


interface IGameInfo {
    total_kills: number,
    players: string[],
    kills: Object[],
    kills_by_means: Object[],
}

class GameInfo implements IGameInfo {

    public total_kills: number = 0;
    public players: string[] = []
    public kills: Object[] = [];
    public kills_by_means: Object[] = []

    public constructor() {
    }
}

async function asyncForEach(array: string[], callback: Function) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export default class Parser {

    public static result: GameInfo[] = [];
    public static rank: Object[] = []

    public constructor() {

    }

    public static restValues() {
        this.result = [];
        this.rank = []
    }



    public static async Parse(path: string, deploy: string, callback?: Function,) {
        try {
            var gameCounter: number = 0;

            const killRegExp: RegExp = /Kill:/g
            const initGameRegExp: RegExp = /InitGame:/g
            const ShutdownGameRegExp: RegExp = /ShutdownGame:/g
            const ClientUserinfoChangedRegExp: RegExp = /ClientUserinfoChanged:/g


            var fileContent: string = fs.readFileSync(path, 'utf8');
            var FC = fileContent.split('\n')

            await asyncForEach(FC, (line: string): void => {

                if (line.match(initGameRegExp)) {
                    let gameName: any = `game-${gameCounter}`
                    gameCounter++
                    this.result[gameName] = new GameInfo();
                }

                if (line.match(ClientUserinfoChangedRegExp)) {

                    let resReg = /n\\(.*)\\t\\/g.exec(line);
                    let gameName: any = `game-${gameCounter - 1}`

                    if (resReg && !this.result[gameName].players.includes(resReg[1]))
                        this.result[gameName].players.push(resReg[1])
                }

                if (line.match(killRegExp)) {
                    let resReg = /([0-9]+) ([0-9]+) ([0-9]+): (.*) killed (.*) by (.*)/g.exec(line);
                    let gameName: any = `game-${gameCounter - 1}`

                    if (resReg) {

                        var from: any = resReg[4];
                        var to: any = resReg[5];
                        var by: any = resReg[6]

                        this.result[gameName].total_kills += 1;

                        if (!this.result[gameName].kills[from] && from !== "<world>" && from !== to) {
                            this.result[gameName].kills[from] = 1
                        }
                        else
                            if (from !== to && from !== "<world>") {
                                let actual: number = this.result[gameName].kills[from] as number;
                                this.result[gameName].kills[from] = actual + 1;
                            }
                            else
                                if (from == "<world>") {
                                    if (!this.result[gameName].kills[to]) {
                                        this.result[gameName].kills[to] = -1;
                                    } else {
                                        let actual: number = this.result[gameName].kills[to] as number;
                                        this.result[gameName].kills[to] = actual - 1;
                                    }
                                }

                        //Means of death
                        if (!this.result[gameName].kills_by_means[by])
                            this.result[gameName].kills_by_means[by] = 1;
                        else {
                            let actual: number = this.result[gameName].kills_by_means[by] as number;
                            this.result[gameName].kills_by_means[by] = actual + 1;
                        }
                    }
                }


                if (line.match(ShutdownGameRegExp)) {
                    let gameName: any = `game-${gameCounter - 1}`
                    this.result[gameName].players.forEach((p: any) => {
                        if (!this.rank[p]) {


                            let thisGame: number = this.result[gameName].kills[p] as number
                            this.rank[p] = thisGame || 0;

                        } else {
                            let actual: number = this.rank[p] as number;
                            let thisGame: number = this.result[gameName].kills[p] as number
                            this.rank[p] = actual + thisGame;
                        }
                    })
                }
            })

            fs.writeFile(deploy, util.inspect(this.result), () => { })

            console.log(this.result)
            console.log({ rank: this.rank })
            
            callback && callback(this.result)
        } catch (err) {
            callback && callback(null, err)
        }


    }



}