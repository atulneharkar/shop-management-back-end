import express from 'express';

/* all controllers */
import {
  getCategoryByID,
  getCategoryList,
  updateCategory,
  createCategory,
  removeCategory
} from '../controllers/category';

const categoryRoutes = express.Router();

/**
 * category create
 * POST /category/create
 */
categoryRoutes.post('/create', createCategory);

/**
 * route to get specific category's info
 * GET /category/:id
 */
categoryRoutes.get('/:id', getCategoryByID);

/**
 * route to get list of products
 * GET /category/list/:status [all, pending, active, inactive]
 */
categoryRoutes.get('/list/:status', getCategoryList);

/**
 * route to update specific category
 * PUT /category/:id
 */
categoryRoutes.put('/:id', updateCategory);

/**
 * route to delete existing category
 * DELETE /category/id
 */
categoryRoutes.delete('/:id', removeCategory);

export default categoryRoutes;