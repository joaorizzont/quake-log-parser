"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
var parser_1 = __importDefault(require("./parser/parser"));
var PORT = 3333;
var path = 'C:/www/quake-log-parser/src/assets/games.reduce.log';
var deployPath = __dirname + "/parsed.test.txt";
var server = server_1.default.newInstance();
// const parser: Parser = new Parser();
parser_1.default.Parse(path, deployPath);
server.run(PORT, function () { return console.log("Server running!"); });
