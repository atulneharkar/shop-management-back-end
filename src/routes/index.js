import express from 'express';

/* all routes */
import authenticationRoutes from './authenticate';
import userRoutes from './user';
import productRoutes from './product';
import categoryRoutes from './category';
import stockPurchaseRoutes from './stockPurchase';
import stockSoldRoutes from './stockSold';

/* all common routes goes here */
import commonRoutes from './common';

/* all middlewares */
import { isAuthorizedUser } from '../middlewares/authenticate';

const routes = express.Router();

/**
 * all authentication routes
 * POST /user/login
 * DELETE /user/logout
 */
routes.use('/user', authenticationRoutes);

/**
 * all user routes
 * POST /user/create
 * PUT /user/update/:id
 */
routes.use('/user', isAuthorizedUser, userRoutes);

/**
 * all product routes
 * POST /product
 * DELETE /product
 */
routes.use('/product', isAuthorizedUser, productRoutes);

/**
 * all category routes
 * POST /category
 * DELETE /category
 */
routes.use('/category', isAuthorizedUser, categoryRoutes);

/**
 * all stockPurchase routes
 * POST /stockPurchase
 * DELETE /stockPurchase
 */
routes.use('/stockPurchase', isAuthorizedUser, stockPurchaseRoutes);

/**
 * all stockSold routes
 * POST /stockSold
 * DELETE /stockSold
 */
routes.use('/stockSold', isAuthorizedUser, stockSoldRoutes);

/**
 * all common routes goes here
 * GET /upload/:type/:file
 */
routes.use(commonRoutes);

export default routes;