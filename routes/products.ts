import * as express from "express";
import { ProductsController } from "../controllers";

const router = express.Router();

const productController = new ProductsController();

/* GET users listing. */
router.get('/', productController.index);

/* GET user details. */
router.get('/:productId', productController.show);

/* POST user. */
router.post('/', productController.create);

/* PUT user. */
router.put('/:productId', productController.update);

/* DELETE user. */
router.delete('/:productId', productController.delete);


export default router;
