"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.middlewares();
        this.routes();
        this.config();
    }
    App.prototype.middlewares = function () {
        // console.log("Mid")
    };
    App.prototype.routes = function () {
        this.app.use('/', routes_1.default);
    };
    App.prototype.run = function (port, callback) {
        if (callback)
            return this.app.listen(port, callback);
        return this.app.listen(port);
    };
    App.newInstance = function () {
        return new App();
    };
    ;
    App.prototype.getApp = function () {
        return this.app;
    };
    App.prototype.config = function () {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(cors_1.default());
    };
    return App;
}());
exports.default = App;
