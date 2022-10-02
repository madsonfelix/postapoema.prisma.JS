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
exports.InteracoesController = void 0;
const interacoesServices_1 = require("../services/interacoesServices");
const interacoesServices = new interacoesServices_1.InteracoesServices();
class InteracoesController {
    controllerGetInteracoes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            if (id === null) {
                return res.status(400).json({ msg: "Informe id" });
            }
            const interacao = yield interacoesServices.getInteracoes(id);
            return res.status(200).json({ interacao });
        });
    }
    controllerSetIdInteracoes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo, comentario, id_usuario, id_poema } = req.body;
            var data_interacao = new Date();
            const id_interacao = yield interacoesServices.getMaxIdInteracao();
            var mensagem = "Informe: ";
            if (tipo.length === 0) {
                mensagem += "tipo,";
            }
            if (comentario.length === 0) {
                mensagem += "comentario,";
            }
            if (id_usuario.length === 0) {
                mensagem += "id_usuario,";
            }
            if (id_poema.length === 0) {
                mensagem += "id_poema,";
            }
            if (mensagem != "Informe: ") {
                mensagem = mensagem.substring(0, mensagem.length - 1);
                return res.status(400).json({ msg: mensagem });
            }
            yield interacoesServices.setInteracao({ id_interacao, tipo, comentario, data_interacao, id_usuario, id_poema });
            return res.status(200).json({ msg: "Concluido!" });
        });
    }
    controllerSetInteracoes() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.InteracoesController = InteracoesController;
