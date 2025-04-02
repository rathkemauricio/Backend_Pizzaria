"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
//-- CONTROLLERS USERS  --
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
//-- CONTROLLERS CATEGORY  --
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
//-- CONTROLLERS PRODUCTS --
const CreateProductsController_1 = require("./controllers/products/CreateProductsController");
const ListByproductControllers_1 = require("./controllers/products/ListByproductControllers");
// -- Controllers Orders -- 
const CreateOrderController_1 = require("./controllers/orders/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/orders/RemoveOrderController");
const DetailOrderController_1 = require("./controllers/orders/DetailOrderController");
const AddItemsController_1 = require("./controllers/orders/AddItemsController");
const RemoveItensController_1 = require("./controllers/orders/RemoveItensController");
const SendOrderController_1 = require("./controllers/orders/SendOrderController");
const ListOrderController_1 = require("./controllers/orders/ListOrderController");
const FinishOrderController_1 = require("./controllers/orders/FinishOrderController");
const router = (0, express_1.Router)();
exports.router = router;
//-- MULTER --
//middleware  para upload do banner
const multer_2 = __importDefault(require("./config/multer"));
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
//-- ROTAS USER --
router.post('/users', new CreateUserController_1.CreateUserController().handle);
router.post('/session', new AuthUserController_1.AuthUserController().handle);
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
//-- ROTAS CATEGORY --
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
router.get('/category', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
//-- ROTAS PRODUCTS --
router.post('/products', isAuthenticated_1.isAuthenticated, new CreateProductsController_1.CreateProductsController().handle);
//router.post('/products', isAuthenticated, upload.single('file'), new CreateProductsController().handle)
router.get('/category/products', isAuthenticated_1.isAuthenticated, new ListByproductControllers_1.ListByCategoryControllers().handle);
// -- ROTAS ORDER --
router.post('/order', isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
router.delete('/order/delete', isAuthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle);
router.post('/order/add', isAuthenticated_1.isAuthenticated, new AddItemsController_1.AddItemsController().handle);
router.delete('/order/remove', isAuthenticated_1.isAuthenticated, new RemoveItensController_1.RemoveItemController().handle);
router.put('/order/send', isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
router.get('/orders', isAuthenticated_1.isAuthenticated, new ListOrderController_1.ListOrderController().handle);
router.get('/order/detail', isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle);
router.put('/order/finish', isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle);
