import { exec } from "child_process";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface Authrequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: Authrequest) {
        // Verificar se o email e a senha estão corretos
        const user = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });

        // Verificar se o usuário existe
        if (!user) {
            throw new Error("User not found!");
        }

        // Preciso verificar se a senha ou email está correta
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Password incorrect!");
        }

        // Gerar um token JWT e devolver os dados do usuário junto com o ID
        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "10d",
            }
        );

        return {
            id: user.id,
            user: user.name,
            email: user.email,
            token: token,
        };
    }
}

export { AuthUserService };
