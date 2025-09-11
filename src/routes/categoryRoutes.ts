import { Router } from 'express';
import { create, getAll, getById, update, remove } from '../controllers/categoryController';
import { authenticateToken, authorizeRoles } from '../middleware/rbacMiddleware';
import { Role } from '../generated/prisma';
import { validate, categorySchema } from '../utils/validation';

const router = Router();

router.post('/', authenticateToken, authorizeRoles([Role.EDITOR]), validate(categorySchema), create);

router.get('/', getAll);

router.get('/:id', getById);

router.put('/:id', authenticateToken, authorizeRoles([Role.EDITOR]), validate(categorySchema.partial()), update);

router.delete('/:id', authenticateToken, authorizeRoles([Role.EDITOR]), remove);

export default router;

