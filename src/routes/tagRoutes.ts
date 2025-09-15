import { Router } from 'express';
import { create, getAll, getById, update, remove } from '../controllers/tagController';
import { authenticateToken, authorizeRoles } from '../middleware/rbacMiddleware';
import { Role } from '../generated/prisma';
import { validate, tagSchema } from '../utils/validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Gerenciamento de tags para artigos
 */

/**
 * @swagger
 * /api/tags:
 *   post:
 *     summary: Cria uma nova tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Futebol
 *     responses:
 *       201:
 *         description: Tag criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: clx0k8s4a0000abcde123456
 *                 name:
 *                   type: string
 *                   example: Futebol
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: O nome da tag já está em uso.
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authenticateToken, authorizeRoles([Role.EDITOR]), validate(tagSchema), create);

/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: Retorna todas as tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Lista de tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/tags/{id}:
 *   get:
 *     summary: Retorna uma tag por ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: clx0k8s4a0000abcde123456
 *         description: ID da tag
 *     responses:
 *       200:
 *         description: Detalhes da tag
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: clx0k8s4a0000abcde123456
 *                 name:
 *                   type: string
 *                   example: Futebol
 *       404:
 *         description: Tag não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Tag não encontrada.
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/tags/{id}:
 *   put:
 *     summary: Atualiza uma tag existente
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: clx0k8s4a0000abcde123456
 *         description: ID da tag a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nova Tag
 *     responses:
 *       200:
 *         description: Tag atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: clx0k8s4a0000abcde123456
 *                 name:
 *                   type: string
 *                   example: Nova Tag
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: O nome da tag já está em uso.
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 *       404:
 *         description: Tag não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Tag não encontrada.
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authenticateToken, authorizeRoles([Role.EDITOR]), validate(tagSchema.partial()), update);

/**
 * @swagger
 * /api/tags/{id}:
 *   delete:
 *     summary: Remove uma tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: clx0k8s4a0000abcde123456
 *         description: ID da tag a ser removida
 *     responses:
 *       204:
 *         description: Tag removida com sucesso (No Content)
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 *       404:
 *         description: Tag não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Tag não encontrada.
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authenticateToken, authorizeRoles([Role.EDITOR]), remove);

export default router;

