import { Request, Response } from "express";
import { PoemServices } from "../services/poemServices";

const poemaServices = new PoemServices();

export class PoemaController{
    //busca poemas
    async getPoema(req: Request, res: Response){
        const {id} = req.body;
        if(id === null){
            return res.status(400).json({msg: "Informe id"});
        }
        var id_poema = Number(id)
        const poema = await poemaServices.getPoema(id_poema)
        return res.status(200).json({poema})
    }
    async setPoema(req: Request, res: Response){
        const{titulo, privado, tema, texto, id_usuario} = req.body;
        var mensagem = "Informe: ";

        var id_poema = await poemaServices.getMaxIdPoema();

        var data_publicacao: Date = new Date();

        if(titulo.length === 0){
            mensagem += "titulo,";
        }
        if(privado.length === 0){
            mensagem += "privado,";
        }
        if(tema.length === 0){
            mensagem += "tema,";
        }
        if(texto.length === 0){
            mensagem += "texto,";
        }
        if(mensagem != "Informe: "){
            mensagem = mensagem.substring(0, mensagem.length -1);
            return res.status(400).json({msg: mensagem})
        }
        // const id_usuario = BigInt(id_usuario_any)
        const poema = await poemaServices.setPoema({id_poema, titulo, privado, data_publicacao, tema, texto}, id_usuario);
        return res.status(200).json({msg: "Concluido"});
    }
}