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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const prismaClient_1 = require("../database/prismaClient");
class UserServices {
    getUser(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prismaClient_1.prismaClient.usuario.findFirst({
                where: {
                    id_usuario,
                }
            });
            return user;
        });
    }
    getNewIdUSer() {
        return __awaiter(this, void 0, void 0, function* () {
            const maxId = yield prismaClient_1.prismaClient.$queryRaw `select MAX(id_usuario) + 1 as maxid from usuario`;
            if (maxId[0].maxid === null) {
                return Number(1);
            }
            return Number(maxId[0].maxid);
        });
    }
    setUser({ id_usuario, nome, senha, email, data_cadastro, telefone, assinatura }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prismaClient_1.prismaClient.usuario.create({
                data: {
                    id_usuario,
                    nome,
                    senha,
                    email,
                    data_cadastro,
                    telefone,
                    assinatura
                }
            });
            return user;
        });
    }
}
exports.UserServices = UserServices;
