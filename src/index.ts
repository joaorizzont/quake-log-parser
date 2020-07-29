import Server from './server';
import Parser from './parser/parser'

const PORT: number = 3333
const path: string = 'C:/www/quake-log-parser/src/assets/games.log'

let result: any;

// const server: Server = Server.newInstance();

// server.run(PORT, () => console.log("Server running!"))

const parser: Parser = new Parser();

parser.Parse(path, (res: any) => {
    result = res;
})




