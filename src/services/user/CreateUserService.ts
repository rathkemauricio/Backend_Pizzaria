import prismaClient from "../../prisma";
import {hash} from 'bcryptjs';


interface UserRequest{
  name: string;
  email: string;
  password: string;
}

class CreateUserService{
  async execute({name, email, password}: UserRequest){

    //Verifica se ele enviou o email
    if(!email){
      throw new Error ('address email incorrect')
    }
    
    //Verificar se endereço de email ja existe
    const userAlreadyExists = await prismaClient.user.findFirst({
      where:{
        email: email 
      }
    })

      const passwordHash = await hash(password, 8)
    

      if (userAlreadyExists){
        throw new Error("users already exists")
      }

      const user = await  prismaClient.user.create({
        data:{
          name: name,
          email: email,
          password: passwordHash,
        },
        select:{
          id: true,
          name: true,
          email: true
        }

    })



    return user;
  }
}

export { CreateUserService }