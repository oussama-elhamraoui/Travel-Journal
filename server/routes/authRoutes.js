import {Router} from 'express';
import {signup_post,login_post,logout_get,getCurrentUser} from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router=Router();
router.post('/signup',signup_post);
router.post('/login',login_post);
router.get('/current-user',requireAuth,getCurrentUser);
router.get('/logout',logout_get);

export default router;
