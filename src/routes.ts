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

export { router }; 