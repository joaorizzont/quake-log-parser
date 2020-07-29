"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = __importDefault(require("../parser/parser"));
var BaseController = /** @class */ (function () {
    function BaseController() {
    }
    BaseController.prototype.getGameById = function (req, res) {
        var _a, _b;
        try {
            var game_id = req.params.game_id;
            var result = parser_1.default.result[game_id];
            if (!result)
                return res.status(404).send({ message: "Game_id não encontrado" });
            var response = {
                total_kills: result['total_kills'],
                players: result['players'],
                kills: {},
                kills_by_means: {},
            };
            var killsValues = Object.values(result['kills']);
            var killsKeys = Object.keys(result['kills']);
            for (var i = 0; i < killsValues.length; i++)
                response.kills = __assign(__assign({}, response.kills), (_a = {}, _a[killsKeys[i]] = killsValues[i], _a));
            var kbmValues = Object.values(result['kills_by_means']);
            var kbmsKeys = Object.keys(result['kills_by_means']);
            for (var i = 0; i < kbmValues.length; i++)
                response.kills_by_means = __assign(__assign({}, response.kills_by_means), (_b = {}, _b[kbmsKeys[i]] = kbmValues[i], _b));
            return res.send(JSON.parse(JSON.stringify(response)));
        }
        catch (err) {
            console.log(err.message);
            return res.status(400).send({ message: "Houve um erro ao buscar o jogo.", error: err.message });
        }
    };
    return BaseController;
}());
exports.default = BaseController;
