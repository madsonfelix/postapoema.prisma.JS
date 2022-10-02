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
exports.InteracoesServices = void 0;
const prismaClient_1 = require("../database/prismaClient");
class InteracoesServices {
    getInteracoes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var id_interacao = id;
            const interacao = yield prismaClient_1.prismaClient.interacoes.findFirst({
                where: {
                    id_interacao
                }
            });
            return interacao;
        });
    }
    getMaxIdInteracao() {
        return __awaiter(this, void 0, void 0, function* () {
            const maxId = yield prismaClient_1.prismaClient.$queryRaw `select MAX(id_interacao) + 1 as maxid from interacoes`;
            if (maxId[0].maxid === null) {
                return Number(1);
            }
            return Number(maxId[0].maxid);
        });
    }
    setInteracao({ id_interacao, tipo, comentario, data_interacao, id_usuario, id_poema }) {
        return __awaiter(this, void 0, void 0, function* () {
            const interacao = yield prismaClient_1.prismaClient.interacoes.create({
                data: {
                    id_interacao,
                    tipo,
                    comentario,
                    data_interacao,
                    id_usuario,
                    id_poema
                }
            });
            return interacao;
        });
    }
}
exports.InteracoesServices = InteracoesServices;
