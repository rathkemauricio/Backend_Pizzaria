import { Request, Response } from "express";
import {DetailUserService } from "../../services/user/DetailUserServices";

class DetailUserController{
    async handle(req:Request, res:Response){

        const detailUersService = new DetailUserService();
        const user = await detailUersService.execute();

        return res.json(user);
    }
}
export {DetailUserController}