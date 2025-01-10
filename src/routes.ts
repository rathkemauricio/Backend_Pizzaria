import { Router } from 'express';
import multer from 'multer';

//-- CONTROLLERS USERS  --
import { AuthUserController } from './controllers/user/AuthUserController'
import { CreateUserController } from './controllers/user/CreateUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated';

//-- CONTROLLERS CATEGORY  --
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController';

//-- CONTROLLERS PRODUCTS --
import { CreateProductsController } from './controllers/products/CreateProductsController';
import { ListByCategoryControllers } from './controllers/products/ListByproductControllers';

// -- Controllers Orders -- 
import { CreateOrderController } from './controllers/orders/CreateOrderController';
import { RemoveOrderController } from './controllers/orders/RemoveOrderController';
import { DetailOrderController } from './controllers/orders/DetailOrderController';
import { AddItemsController } from './controllers/orders/AddItemsController';
import { RemoveItemController } from './controllers/orders/RemoveItensController';
import { SendOrderController } from './controllers/orders/SendOrderController';
import { ListOrderController } from './controllers/orders/ListOrderController';
import { FinishOrderController } from './controllers/orders/FinishOrderController';
const router = Router();

//-- MULTER --
//middleware  para upload do banner
import uploadConfig from './config/multer'
const upload = multer(uploadConfig.upload("./tmp"));

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/userinfo',isAuthenticated, new DetailUserController().handle)

//-- ROTAS CATEGORY --

router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

//-- ROTAS PRODUCTS --
router.post('/products', isAuthenticated, upload.single('file'), new CreateProductsController().handle)
router.get('/category/products', isAuthenticated, new ListByCategoryControllers().handle)

// -- ROTAS ORDER --
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order/delete', isAuthenticated, new RemoveOrderController ().handle)

router.post('/order/add', isAuthenticated, new AddItemsController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrderController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)
export { router }; 