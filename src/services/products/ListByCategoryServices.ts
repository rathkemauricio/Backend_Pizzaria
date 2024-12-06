import prismaClient from "../../prisma";

interface productRequest{
    category_id: string;
}
class ListByCategoryServices {
    async execute({category_id}: productRequest) {
        const findBycategory= await prismaClient.product.findMany({
            where: {
                category_id: category_id
            }
        })
        return findBycategory;
    }
}
export {ListByCategoryServices}