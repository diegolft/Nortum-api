import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

// POST /auth/register
router.post('/register', (req, res) => authController.register(req, res));

// POST /auth/login
router.post('/login', (req, res) => authController.login(req, res));

export default router;
