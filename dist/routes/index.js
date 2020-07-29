"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var BaseController_1 = __importDefault(require("../controllers/BaseController"));
var router = express_1.Router();
//initializing
var baseController = new BaseController_1.default();
// ---------
router.get('/:game_id', baseController.getGameById);
exports.default = router;
