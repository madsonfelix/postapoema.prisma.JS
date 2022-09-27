import { prismaClient } from "../database/prismaClient"

interface IInteracoes{
    id_interacao:    bigint
    tipo:            bigint
    comentario:      string
    data_interacao:  Date
    id_usuario:      bigint
    id_poema:        bigint
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
            return BigInt(1)
        }
        return BigInt(maxId[0].maxid)
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