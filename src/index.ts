import Server from './server';
import Parser from './parser/parser'

const PORT: number = 3333
const path: string = 'C:/www/quake-log-parser/src/assets/games.reduce.log'
const deployPath: string = `${__dirname}/src/assets/parsed.txt`;
const server: Server = Server.newInstance();


Parser.Parse(path, deployPath)
server.run(PORT, () => console.log("Server running!"))





