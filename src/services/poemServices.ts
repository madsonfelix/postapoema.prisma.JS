import { prismaClient } from "../database/prismaClient";

interface IPoema{
    id_poema:            number
    titulo?:             string 
    privado:             number
    data_publicacao:     Date
    tema?:               string 
    texto:               string  
}

interface IAutoria{
    id_autoria?: bigint
    id_usuario: bigint
    id_poema?:   bigint
}

export class PoemServices{
    async getPoema(id_poema: bigint){
        const poema = await prismaClient.poema.findFirst({
            where:{
                id_poema
            }
        })
        return poema;
    }
    async getMaxIdPoema(){
        const maxId: any = await prismaClient.$queryRaw`select MAX(id_poema) + 1 as maxid from poema`
        if(maxId[0].maxid === null){
            return Number(1)
        }
        return Number(maxId[0].maxid)
    }
    async getMaxIdPoemaBigint(){
        const maxId: any = await prismaClient.$queryRaw`select MAX(id_poema) + 1 as maxid from poema`
        if(maxId[0].maxid === null){
            return BigInt(1)
        }
        return BigInt(maxId[0].maxid)
    }
    async getMaxIdAutoria(){
        const maxId: any = await prismaClient.$queryRaw`select MAX(id_autoria) + 1 as maxid from autoria`
        if(maxId[0].maxid === null){
            return BigInt(1)
        }
        return BigInt(maxId[0].maxid)
    }
    async setPoema({id_poema, titulo, privado, data_publicacao, tema, texto}: IPoema, id_usuario: bigint){

        const poema = await prismaClient.poema.create({
            data:{
                id_poema,
                titulo,
                privado,
                data_publicacao,
                tema,
                texto
            }
        })
        
        var identificadorPoema = BigInt(id_poema) // precisei fazer essa jogada pois o tipo de id_poema é diferente entre as duas tabelas.
        
        await this.setAutoria({id_usuario}, identificadorPoema)
        return poema
    }
    async setAutoria({id_usuario}:IAutoria, identificadorPoema:bigint){
        const id_autoria = await this.getMaxIdAutoria();
        const id_poema : bigint = identificadorPoema
        await prismaClient.autoria.create({
            data:{
                id_autoria,
                id_usuario,
                id_poema
            }
        })
    }
}