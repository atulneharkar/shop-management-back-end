import express from 'express';

/* all controllers */
import {
  getUserByID,
  getUserList,
  updateUser,
  setAvatar
} from '../controllers/user';

/* pic upload */
import { avatarUpload } from '../helpers/upload';

const userRoutes = express.Router();

/**
 * route to get specific user's info
 * GET /user/:id
 */
userRoutes.get('/:id', getUserByID);

/**
 * route to get list of users
 * GET /user/list/:status [all, pending, active, inactive]
 */
userRoutes.get('/list/:status', getUserList);

/**
 * route to update specific user
 * PUT /user/:id
 */
userRoutes.put('/:id', updateUser);

/**
 * route to set user avatar
 * POST /user/avatar
 */
userRoutes.post('/avatar', avatarUpload, setAvatar);

export default userRoutes;