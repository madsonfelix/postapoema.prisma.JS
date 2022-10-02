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
exports.PoemServices = void 0;
const prismaClient_1 = require("../database/prismaClient");
class PoemServices {
    getPoema(id_poema) {
        return __awaiter(this, void 0, void 0, function* () {
            const poema = yield prismaClient_1.prismaClient.poema.findFirst({
                where: {
                    id_poema
                }
            });
            return poema;
        });
    }
    getMaxIdPoema() {
        return __awaiter(this, void 0, void 0, function* () {
            const maxId = yield prismaClient_1.prismaClient.$queryRaw `select MAX(id_poema) + 1 as maxid from poema`;
            if (maxId[0].maxid === null) {
                return Number(1);
            }
            return Number(maxId[0].maxid);
        });
    }
    getMaxIdPoemaBigint() {
        return __awaiter(this, void 0, void 0, function* () {
            const maxId = yield prismaClient_1.prismaClient.$queryRaw `select MAX(id_poema) + 1 as maxid from poema`;
            if (maxId[0].maxid === null) {
                return Number(1);
            }
            return Number(maxId[0].maxid);
        });
    }
    getMaxIdAutoria() {
        return __awaiter(this, void 0, void 0, function* () {
            const maxId = yield prismaClient_1.prismaClient.$queryRaw `select MAX(id_autoria) + 1 as maxid from autoria`;
            if (maxId[0].maxid === null) {
                return Number(1);
            }
            return Number(maxId[0].maxid);
        });
    }
    setPoema({ id_poema, titulo, privado, data_publicacao, tema, texto }, id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const poema = yield prismaClient_1.prismaClient.poema.create({
                data: {
                    id_poema,
                    titulo,
                    privado,
                    data_publicacao,
                    tema,
                    texto
                }
            });
            var identificadorPoema = Number(id_poema); // precisei fazer essa jogada pois o tipo de id_poema é diferente entre as duas tabelas.
            yield this.setAutoria({ id_usuario }, identificadorPoema);
            return poema;
        });
    }
    setAutoria({ id_usuario }, identificadorPoema) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_autoria = yield this.getMaxIdAutoria();
            const id_poema = identificadorPoema;
            yield prismaClient_1.prismaClient.autoria.create({
                data: {
                    id_autoria,
                    id_usuario,
                    id_poema
                }
            });
        });
    }
}
exports.PoemServices = PoemServices;
