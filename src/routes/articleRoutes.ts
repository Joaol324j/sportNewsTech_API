import { Router } from 'express';
import { create, getById, update, remove, list } from '../controllers/articleController';
import { authenticateToken, authorizeRoles } from '../middleware/rbacMiddleware';
import { Role } from '../generated/prisma';
import { validate, articleSchema } from '../utils/validation';

const router = Router();

router.post('/', authenticateToken, authorizeRoles([Role.JOURNALIST, Role.EDITOR]), validate(articleSchema), create);

router.get('/:id', getById);

router.put('/:id', authenticateToken, authorizeRoles([Role.JOURNALIST, Role.EDITOR]), validate(articleSchema.partial()), update);

router.delete('/:id', authenticateToken, authorizeRoles([Role.JOURNALIST, Role.EDITOR]), remove);

router.get('/', list);

export default router;



