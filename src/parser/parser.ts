import fs from 'fs'
import util from 'util'

const meansOfDeath = [
    'MOD_UNKNOWN',
    'MOD_SHOTGUN',
    'MOD_GAUNTLET',
    'MOD_MACHINEGUN',
    'MOD_GRENADE',
    'MOD_GRENADE_SPLASH',
    'MOD_ROCKET',
    'MOD_ROCKET_SPLASH',
    'MOD_PLASMA',
    'MOD_PLASMA_SPLASH',
    'MOD_RAILGUN',
    'MOD_LIGHTNING',
    'MOD_BFG',
    'MOD_BFG_SPLASH',
    'MOD_WATER',
    'MOD_SLIME',
    'MOD_LAVA',
    'MOD_CRUSH',
    'MOD_TELEFRAG',
    'MOD_FALLING',
    'MOD_SUICIDE',
    'MOD_TARGET_LASER',
    'MOD_TRIGGER_HURT',
    'MOD_GRAPPLE'
]


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

    private result: GameInfo[];

    public constructor() {
        this.result = []
    }


    public async Parse(path: string, callback?: Function) {

        var data: string = '';
        var gameCounter: number = 0;

        const killRegExp: RegExp = /Kill:/g
        const initGameRegExp: RegExp = /InitGame:/g
        const ShutdownGameRegExp: RegExp = /ShutdownGame:/g
        const ClientUserinfoChangedRegExp: RegExp = /ClientUserinfoChanged:/g
        // /(n\\)(.*)(\\t\\0)/g



        var fileContent: string = fs.readFileSync(path, 'utf8');

        // fileContent.split('\n').forEach((line: string): void => {

        //     if (line.match(initGameRegExp)) {
        //         var gameName: any = `game-${gameCounter}`
        //         gameCounter++
        //         this.result[gameName] = new GameInfo();
        //         console.log("Jogo Iniciado")
        //     }

        //     if (line.match(ClientUserinfoChangedRegExp)) {

        //         let resReg = /n\\(.*)\\t\\/g.exec(line);
        //         let gameName: any = `game-${gameCounter - 1}`

        //         if (resReg && !this.result[gameName].players.includes(resReg[1]))
        //             this.result[gameName].players.push(resReg[1])
        //     }

        //     if (line.match(killRegExp)) {
        //         let resReg = /([0-9]+) ([0-9]+) ([0-9]+): (.*) killed (.*) by (.*)/g.exec(line);
        //         let gameName: any = `game-${gameCounter - 1}`

        //         if (resReg) {

        //             var from: any = resReg[4];
        //             var to: any = resReg[5];
        //             var by: any = resReg[6]

        //             this.result[gameName].total_kills += 1;

        //             if (from != "<world>") {

        //                 if (!this.result[gameName].kills[from])
        //                     this.result[gameName].kills[from] = from == to ? -1 : 1;
        //                 else {
        //                     let actual: number = this.result[gameName].kills[from] as number;

        //                     if (from !== "<world>" && from !== to) this.result[gameName].kills[from] = actual + 1;
        //                     else this.result[gameName].kills[from] = actual - 1;
        //                 }



        //                 if (!this.result[gameName].kills_by_means[by])
        //                     this.result[gameName].kills_by_means[by] = 1;
        //                 else {
        //                     let actual: number = this.result[gameName].kills_by_means[by] as number;
        //                     this.result[gameName].kills_by_means[by] = actual + 1;
        //                 }
        //             }
        //         }
        //     }


        //     if (line.match(ShutdownGameRegExp)) { }
        // })

        var FC = fileContent.split('\n')

        await asyncForEach(FC, (line: string): void => {

            if (line.match(initGameRegExp)) {
                var gameName: any = `game-${gameCounter}`
                gameCounter++
                this.result[gameName] = new GameInfo();
                // console.log("Jogo Iniciado")
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

                    if (from != "<world>") {

                        if (!this.result[gameName].kills[from])
                            this.result[gameName].kills[from] = from == to ? -1 : 1;
                        else {
                            let actual: number = this.result[gameName].kills[from] as number;

                            if (from !== "<world>" && from !== to) this.result[gameName].kills[from] = actual + 1;
                            else this.result[gameName].kills[from] = actual - 1;
                        }



                        if (!this.result[gameName].kills_by_means[by])
                            this.result[gameName].kills_by_means[by] = 1;
                        else {
                            let actual: number = this.result[gameName].kills_by_means[by] as number;
                            this.result[gameName].kills_by_means[by] = actual + 1;
                        }
                    }
                }
            }
        })

        fs.writeFile('parsed.txt', util.inspect(this.result), () => { })
        callback && callback(this.result)
    }



}