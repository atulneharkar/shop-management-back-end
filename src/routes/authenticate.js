import express from 'express';

/* all controllers */
import {
  login,
  loginSocial,
  logout,
  sendOTPLink,
  resetPassword
} from '../controllers/authenticate';

import { createUser } from '../controllers/user';

/* all middleware */
import { isAuthorizedUser } from '../middlewares/authenticate';

const authenticationRoutes = express.Router();

/**
 * route to create a new user
 * POST /user/create
 */
authenticationRoutes.post('/create', createUser);

/**
 * user login
 * POST /user/login
 */
authenticationRoutes.post('/login', login);

/**
 * user login
 * POST /user/login
 */
authenticationRoutes.post('/login-social', loginSocial);

/**
 * user logout
 * DELETE /user/logout
 */
authenticationRoutes.delete('/logout', isAuthorizedUser, logout);

/**
 * route to send forgot password link
 * POST /forgot-password
 * required email
 */
authenticationRoutes.post('/forgot-password', sendOTPLink);

/**
 * route to reset the password
 * POST /reset-password
 * required otp, userID, password
 */
authenticationRoutes.post('/reset-password', resetPassword);

export default authenticationRoutes;