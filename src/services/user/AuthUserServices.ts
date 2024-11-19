import { exec } from "child_process";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
interface Authrequest{
    email:string;
    password: string;
}



class AuthUserService{
    async execute({email, password}: Authrequest){
    //Verificar se o email e a senha estão corretas     
        const user = await prismaClient.user.findFirst({
            where:{
                email: email,

            }
        })
        if (!user){
            throw new Error("User or password is incorrect")
        }
    //Preciso verificar se a seha ou email esta correta
        const passwordMacth = await compare(password, user.password)
            if (!passwordMacth){
                throw new Error("User or password incorrect!")
            }

    //Gerar um token JWT e devolver os dados do Usuário junto com o id
    //Caso der certto  vamos gerar um token para o usuário
    const token = sign(
        //payload   
        {
        name: user.name,
        email: user.email,
        },
        process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: '10d'
        }
)
                  



            return{
                id : user.id,
                user: user.name,
                email:user.email,
                token: token     
                
            }
    }
}

export {AuthUserService}