import { Request, Response } from "express";
import {UserServices} from "../services/userServices"

const servicoUser = new UserServices();

export class UserControllers{
    //funcao para buscar usuario pelo id
    async controllerGetUser(req: Request, res: Response){
        const {id} = req.body;
        if(id === null){
            return res.status(400).json({msg: "Informe id"});
        }

        const user = await servicoUser.getUser(id);
        return res.status(200).json({user});

    }
    //funcao para inserir novo usuario;
    async controllerSetUser(req: Request, res: Response){
        const {nome, senha, email, telefone, assinatura} = req.body;

        var id_usuario = await servicoUser.getNewIdUSer()

        //Pegar a data atual
        var data_cadastro: Date = new Date()

        var mensagem = "Informe: ";
        if(nome.length === 0){
            mensagem += "Nome,";
        }
        if(senha.length === 0){
            mensagem += " Password,";
        }
        if(email.length === 0){
            mensagem += " Email,";
        }
        if(telefone.length === 0){
            mensagem += " Telefone,";
        }
        if(assinatura.length === 0){
            mensagem += " Assinatura,";
        }
        if(mensagem != "Informe: "){
            mensagem = mensagem.substring(0, mensagem.length -1);
            return res.status(400).json({msg: mensagem})
        }

        const user = await servicoUser.setUser({id_usuario, nome, senha, email, data_cadastro, telefone, assinatura});
        return res.status(200).json({msg: "inserido com sucesso", id_usuario: id_usuario});
        
    }
}