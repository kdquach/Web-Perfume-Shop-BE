import { Router } from 'express';
import { 
  getAllProducts,
  createNewProduct,
  deleteProduct,
  updateProduct
} from '../controllers/product.controller';

const router = Router();

router.get('/products', getAllProducts);
router.post('/create-new-product', createNewProduct);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

export default router;