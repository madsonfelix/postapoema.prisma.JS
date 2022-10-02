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
exports.UserControllers = void 0;
const userServices_1 = require("../services/userServices");
const servicoUser = new userServices_1.UserServices();
class UserControllers {
    //funcao para buscar usuario pelo id
    controllerGetUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            if (id === null) {
                return res.status(400).json({ msg: "Informe id" });
            }
            const user = yield servicoUser.getUser(id);
            return res.status(200).json({ user });
        });
    }
    //funcao para inserir novo usuario;
    controllerSetUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, senha, email, telefone, assinatura } = req.body;
            var id_usuario = yield servicoUser.getNewIdUSer();
            //Pegar a data atual
            var data_cadastro = new Date();
            var mensagem = "Informe: ";
            if (nome.length === 0) {
                mensagem += "Nome,";
            }
            if (senha.length === 0) {
                mensagem += " Password,";
            }
            if (email.length === 0) {
                mensagem += " Email,";
            }
            if (telefone.length === 0) {
                mensagem += " Telefone,";
            }
            if (assinatura.length === 0) {
                mensagem += " Assinatura,";
            }
            if (mensagem != "Informe: ") {
                mensagem = mensagem.substring(0, mensagem.length - 1);
                return res.status(400).json({ msg: mensagem });
            }
            const user = yield servicoUser.setUser({ id_usuario, nome, senha, email, data_cadastro, telefone, assinatura });
            return res.status(200).json({ msg: "inserido com sucesso", id_usuario: id_usuario });
        });
    }
}
exports.UserControllers = UserControllers;
