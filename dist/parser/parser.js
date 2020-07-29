"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var util_1 = __importDefault(require("util"));
var GameInfo = /** @class */ (function () {
    function GameInfo() {
        this.total_kills = 0;
        this.players = [];
        this.kills = [];
        this.kills_by_means = [];
    }
    return GameInfo;
}());
function asyncForEach(array, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < array.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, callback(array[index], index, array)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    index++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.restValues = function () {
        this.result = [];
        this.rank = [];
    };
    Parser.Parse = function (path, deploy, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var data, gameCounter, killRegExp_1, initGameRegExp_1, ShutdownGameRegExp_1, ClientUserinfoChangedRegExp_1, fileContent, FC, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = '';
                        gameCounter = 0;
                        killRegExp_1 = /Kill:/g;
                        initGameRegExp_1 = /InitGame:/g;
                        ShutdownGameRegExp_1 = /ShutdownGame:/g;
                        ClientUserinfoChangedRegExp_1 = /ClientUserinfoChanged:/g;
                        fileContent = fs_1.default.readFileSync(path, 'utf8');
                        FC = fileContent.split('\n');
                        return [4 /*yield*/, asyncForEach(FC, function (line) {
                                if (line.match(initGameRegExp_1)) {
                                    var gameName = "game-" + gameCounter;
                                    gameCounter++;
                                    _this.result[gameName] = new GameInfo();
                                    // console.log("Jogo Iniciado")
                                }
                                if (line.match(ClientUserinfoChangedRegExp_1)) {
                                    var resReg = /n\\(.*)\\t\\/g.exec(line);
                                    var gameName = "game-" + (gameCounter - 1);
                                    if (resReg && !_this.result[gameName].players.includes(resReg[1]))
                                        _this.result[gameName].players.push(resReg[1]);
                                }
                                if (line.match(killRegExp_1)) {
                                    var resReg = /([0-9]+) ([0-9]+) ([0-9]+): (.*) killed (.*) by (.*)/g.exec(line);
                                    var gameName = "game-" + (gameCounter - 1);
                                    if (resReg) {
                                        var from = resReg[4];
                                        var to = resReg[5];
                                        var by = resReg[6];
                                        _this.result[gameName].total_kills += 1;
                                        //Number of kills to player to this game
                                        // if (!this.result[gameName].kills[from] && from !== "<world>" && from !== to)
                                        //     this.result[gameName].kills[from] = 1;
                                        // else {
                                        //     let actual: number = this.result[gameName].kills[from] as number;
                                        //     if (from !== to && from !== "<world>")
                                        //     else
                                        //         if (from == '<world>')
                                        //             this.result[gameName].kills[to] = actual - 1;
                                        // }
                                        if (!_this.result[gameName].kills[from] && from !== "<world>" && from !== to) {
                                            _this.result[gameName].kills[from] = 1;
                                        }
                                        else if (from !== to && from !== "<world>") {
                                            var actual = _this.result[gameName].kills[from];
                                            _this.result[gameName].kills[from] = actual + 1;
                                        }
                                        else if (from == "<world>") {
                                            if (!_this.result[gameName].kills[to]) {
                                                _this.result[gameName].kills[to] = -1;
                                            }
                                            else {
                                                var actual = _this.result[gameName].kills[to];
                                                _this.result[gameName].kills[to] = actual - 1;
                                            }
                                        }
                                        //Means of death
                                        if (!_this.result[gameName].kills_by_means[by])
                                            _this.result[gameName].kills_by_means[by] = 1;
                                        else {
                                            var actual = _this.result[gameName].kills_by_means[by];
                                            _this.result[gameName].kills_by_means[by] = actual + 1;
                                        }
                                    }
                                }
                                if (line.match(ShutdownGameRegExp_1)) {
                                    var gameName_1 = "game-" + (gameCounter - 1);
                                    _this.result[gameName_1].players.forEach(function (p) {
                                        if (!_this.rank[p]) {
                                            var thisGame = _this.result[gameName_1].kills[p];
                                            _this.rank[p] = thisGame || 0;
                                        }
                                        else {
                                            var actual = _this.rank[p];
                                            var thisGame = _this.result[gameName_1].kills[p];
                                            _this.rank[p] = actual + thisGame;
                                        }
                                    });
                                }
                            })];
                    case 1:
                        _a.sent();
                        fs_1.default.writeFile(deploy, util_1.default.inspect(this.result), function () { });
                        console.log(this.result, { rank: this.rank });
                        callback && callback(this.result);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        callback && callback(null, err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Parser.result = [];
    Parser.rank = [];
    return Parser;
}());
exports.default = Parser;
