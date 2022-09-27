import { prisma } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";

interface IUser{
    id_usuario:    number
    nome:          string
    senha:         string
    email:         string
    data_cadastro: Date
    telefone:      string
    assinatura:    string
}

export class UserServices{
    async getUser(id_usuario: any){
        const user = await prismaClient.usuario.findFirst({
            where: {
                id_usuario,
            }
        })
        return user
    }
    async getNewIdUSer(){
        const maxId: any = await prismaClient.$queryRaw`select MAX(id_usuario) + 1 as maxid from usuario`
        if(maxId[0].maxid === null){
            return Number(1)
        }
        return Number(maxId[0].maxid)
    }
    async setUser({id_usuario, nome, senha, email, data_cadastro, telefone, assinatura}:IUser){
        const user = await prismaClient.usuario.create({
            data:{
                id_usuario,
                nome,
                senha,   
                email,   
                data_cadastro,   
                telefone,    
                assinatura
            }
        })
        return user;
    }
}