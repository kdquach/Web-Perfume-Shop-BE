import { Router } from 'express';
import { 
  registerUser,
  getAllUsers,
  login
} from '../controllers/user.controller';

const router = Router();

router.post('/register', registerUser);
router.post('/login', login as any);
router.get('/users', getAllUsers);

export default router;