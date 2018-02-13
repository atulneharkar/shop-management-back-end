import express from 'express';

/* all controllers */
import {
  getStockPurchaseByID,
  updateStockPurchase,
  createStockPurchase,
  removeStockPurchase
} from '../controllers/StockPurchase';

const stockPurchaseRoutes = express.Router();

/**
 * stockPurchase create
 * POST /stockPurchase/create
 */
stockPurchaseRoutes.post('/create/:productId', createStockPurchase);

/**
 * route to get specific stockPurchase's info
 * GET /stockPurchase/:id
 */
stockPurchaseRoutes.get('/:id', getStockPurchaseByID);

/**
 * route to update specific stockPurchase
 * PUT /stockPurchase/:id
 */
stockPurchaseRoutes.put('/:id', updateStockPurchase);

/**
 * route to delete existing stockPurchase
 * DELETE /stockPurchase
 */
stockPurchaseRoutes.delete('/:id/:productId', removeStockPurchase);

export default stockPurchaseRoutes;