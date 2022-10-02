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
exports.PoemaController = void 0;
const poemServices_1 = require("../services/poemServices");
const poemaServices = new poemServices_1.PoemServices();
class PoemaController {
    //busca poemas
    getPoema(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            if (id === null) {
                return res.status(400).json({ msg: "Informe id" });
            }
            var id_poema = Number(id);
            const poema = yield poemaServices.getPoema(id_poema);
            return res.status(200).json({ poema });
        });
    }
    setPoema(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { titulo, privado, tema, texto, id_usuario } = req.body;
            var mensagem = "Informe: ";
            var id_poema = yield poemaServices.getMaxIdPoema();
            var data_publicacao = new Date();
            if (titulo.length === 0) {
                mensagem += "titulo,";
            }
            if (privado.length === 0) {
                mensagem += "privado,";
            }
            if (tema.length === 0) {
                mensagem += "tema,";
            }
            if (texto.length === 0) {
                mensagem += "texto,";
            }
            if (mensagem != "Informe: ") {
                mensagem = mensagem.substring(0, mensagem.length - 1);
                return res.status(400).json({ msg: mensagem });
            }
            // const id_usuario = BigInt(id_usuario_any)
            const poema = yield poemaServices.setPoema({ id_poema, titulo, privado, data_publicacao, tema, texto }, id_usuario);
            return res.status(200).json({ msg: "Concluido" });
        });
    }
}
exports.PoemaController = PoemaController;
