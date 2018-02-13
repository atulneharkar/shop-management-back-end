import express from 'express';

/* all controllers */
import {
  getProductByID,
  getProductList,
  updateProduct,
  createProduct,
  removeProduct,
  setProductImage
} from '../controllers/product';

/* pic upload */
import { avatarUpload } from '../helpers/upload';

const productRoutes = express.Router();

/**
 * product create
 * POST /product/create
 */
productRoutes.post('/create', createProduct);

/**
 * route to get specific product's info
 * GET /product/:id
 */
productRoutes.get('/:id', getProductByID);

/**
 * route to get list of products
 * GET /product/list/:category 
 */
productRoutes.get('/list/:category', getProductList);

/**
 * route to update specific product
 * PUT /product/:id
 */
productRoutes.put('/:id', updateProduct);

/**
 * route to delete existing trending
 * DELETE /trending/new
 */
productRoutes.delete('/:id', removeProduct);

/**
 * route to set trending image
 * POST /trending/trendingImage
 */
productRoutes.post('/productImage/:id', avatarUpload, setProductImage);


export default productRoutes;