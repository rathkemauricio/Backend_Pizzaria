import { Request, Response } from "express";
import { CreateOrderService } from "../../services/orders/CreateOrderService";

export class CreateOrderController {
    async handle(req: Request, res: Response) {
        // A função do req.body serve para pegar os dados do corpo da requisição
        const { table, name } = req.body;

        const createOrderService = new CreateOrderService();

        const order = await createOrderService.execute({
            table: table,
            name: name
        });
        return res.json(order);
    }
}
