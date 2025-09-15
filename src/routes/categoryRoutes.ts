import { Router } from 'express';
import { create, getAll, getById, update, remove } from '../controllers/categoryController';
import { authenticateToken, authorizeRoles } from '../middleware/rbacMiddleware';
import { Role } from '../generated/prisma';
import { validate, categorySchema } from '../utils/validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias de artigos
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
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
 *                 example: Esportes
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
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
 *                   example: Esportes
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: O nome da categoria já está em uso.
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authenticateToken, authorizeRoles([Role.EDITOR]), validate(categorySchema), create);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retorna todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
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
 * /api/categories/{id}:
 *   get:
 *     summary: Retorna uma categoria por ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: clx0k8s4a0000abcde123456
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Detalhes da categoria
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
 *                   example: Esportes
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Categoria não encontrada.
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Atualiza uma categoria existente
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: clx0k8s4a0000abcde123456
 *         description: ID da categoria a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Notícias Atualizadas
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
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
 *                   example: Notícias Atualizadas
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: O nome da categoria já está em uso.
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 *       404:
 *         description: Categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Categoria não encontrada.
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authenticateToken, authorizeRoles([Role.EDITOR]), validate(categorySchema.partial()), update);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Remove uma categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: clx0k8s4a0000abcde123456
 *         description: ID da categoria a ser removida
 *     responses:
 *       204:
 *         description: Categoria removida com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authenticateToken, authorizeRoles([Role.EDITOR]), remove);

export default router;

