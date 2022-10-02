import { Request, Response } from "express";
import { InteracoesServices } from "../services/interacoesServices";

const interacoesServices = new InteracoesServices()

export class InteracoesController{
    async controllerGetInteracoes(req: Request, res: Response){
        const {id} = req.body

        if(id === null){
            return res.status(400).json({msg: "Informe id"});
        }

        const interacao = await interacoesServices.getInteracoes(id)
        return res.status(200).json({interacao})

    }
    async controllerSetIdInteracoes(req: Request, res: Response){
        const {tipo, comentario, id_usuario, id_poema} = req.body

        var data_interacao: Date = new Date()

        const id_interacao = await interacoesServices.getMaxIdInteracao()

        var mensagem = "Informe: ";
        if(tipo.length === 0){
            mensagem += "tipo,";
        }
        if(comentario.length === 0){
            mensagem += "comentario,";
        }
        if(id_usuario.length === 0){
            mensagem += "id_usuario,";
        }
        if(id_poema.length === 0){
            mensagem += "id_poema,";
        }
        if(mensagem != "Informe: "){
            mensagem = mensagem.substring(0, mensagem.length -1);
            return res.status(400).json({msg: mensagem})
        }

        await interacoesServices.setInteracao({id_interacao, tipo, comentario, data_interacao, id_usuario, id_poema})
        return res.status(200).json({msg: "Concluido!"})
    }
    async controllerSetInteracoes(){

    }
}