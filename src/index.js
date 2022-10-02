"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const port = process.env.PORT || 3000;
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(routes_1.router);
server.listen(port, () => {
    console.log("Rodando em :" + port);
});
