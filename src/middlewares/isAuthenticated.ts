import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface payload{
    sub: string;
    
}


export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    //receber o token 
    const authToken= req.headers.authorization;

        if (!authToken){
            return res.status(401).end();

        }
        console.log(authToken);
}