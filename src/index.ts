import Server from './server';
import Parser from './parser/parser'

const PORT: number = 3333
const path: string = 'C:/www/quake-log-parser/src/assets/games.reduce.log'
const deployPath: string = `${__dirname}/parsed.test.txt`;
const server: Server = Server.newInstance();
// const parser: Parser = new Parser();

Parser.Parse(path, deployPath)
server.run(PORT, () => console.log("Server running!"))





