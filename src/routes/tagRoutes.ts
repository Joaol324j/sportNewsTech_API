import { Router } from 'express';
import { create, getAll, getById, update, remove } from '../controllers/tagController';
import { authenticateToken, authorizeRoles } from '../middleware/rbacMiddleware';
import { Role } from '../generated/prisma';
import { validate, tagSchema } from '../utils/validation';

const router = Router();

router.post('/', authenticateToken, authorizeRoles([Role.EDITOR]), validate(tagSchema), create);

router.get('/', getAll);

router.get('/:id', getById);

router.put('/:id', authenticateToken, authorizeRoles([Role.EDITOR]), validate(tagSchema.partial()), update);

router.delete('/:id', authenticateToken, authorizeRoles([Role.EDITOR]), remove);

export default router;

