import { Response, Request } from "express";
import { CreateProductsServices } from "../../services/products/CreateProductsService";
import multer from "multer";

class CreateProductsController{
    async handle(req:Request, res:Response){
        const {name, price, description, category_id} = req.body;

        const createProductsServices  = new CreateProductsServices();

        if (!req.file){
            throw new Error("error upload file")
        }else{
            const {originalname, filename: banner} = req.file;

            const product = await createProductsServices.execute({
                name,
                price,
                description,
                banner,
                category_id,
            });
        
            return res.json(product);
        }
     
    }
}
export {CreateProductsController}