import { prismaClient } from "../database/prismaClient"

interface IInteracoes{
    id_interacao:    number
    tipo:            number
    comentario:      string
    data_interacao:  Date
    id_usuario:      number
    id_poema:        number
}

export class InteracoesServices{
    async getInteracoes(id:any){
        var id_interacao = id
        const interacao = await prismaClient.interacoes.findFirst({
            where:{
                id_interacao
            }
        })
        return interacao
    }
    async getMaxIdInteracao(){
        const maxId: any = await prismaClient.$queryRaw`select MAX(id_interacao) + 1 as maxid from interacoes`
        if(maxId[0].maxid === null){
            return Number(1)
        }
        return Number(maxId[0].maxid)
    }
    async setInteracao({id_interacao, tipo, comentario, data_interacao, id_usuario, id_poema}: IInteracoes){
        
        const interacao = await prismaClient.interacoes.create({
            data:{
                id_interacao,
                tipo,
                comentario,
                data_interacao,
                id_usuario,
                id_poema
            }
        })

        return interacao

    }

}