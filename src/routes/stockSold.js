import express from 'express';

/* all controllers */
import {
  getStockSoldByID,
  updateStockSold,
  createStockSold,
  removeStockSold
} from '../controllers/StockSold';

const stockSoldRoutes = express.Router();

/**
 * stockSold create
 * POST /stockSold/create
 */
stockSoldRoutes.post('/create/:productId', createStockSold);

/**
 * route to get specific stockSold's info
 * GET /stockSold/:id
 */
stockSoldRoutes.get('/:id', getStockSoldByID);

/**
 * route to update specific stockSold
 * PUT /stockSold/:id
 */
stockSoldRoutes.put('/:id', updateStockSold);

/**
 * route to delete existing stockSold
 * DELETE /stockSold
 */
stockSoldRoutes.delete('/:id/:productId', removeStockSold);

export default stockSoldRoutes;