import { Router } from 'express';
import { create, getById, update, remove, list } from '../controllers/articleController';
import { authenticateToken, authorizeRoles } from '../middleware/rbacMiddleware';
import { Role } from '../generated/prisma';
import { validate, articleSchema } from '../utils/validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Artigos
 *   description: Gerenciamento de artigos
 */

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Cria um novo artigo
 *     tags: [Artigos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Meu Primeiro Artigo
 *               subtitle:
 *                 type: string
 *                 example: Um subtítulo interessante
 *               content:
 *                 type: string
 *                 example: Conteúdo completo do artigo.
 *               coverImage:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               status:
 *                 type: string
 *                 enum: [DRAFT, SCHEDULED, PUBLISHED]
 *                 example: DRAFT
 *               publishedAt:
 *                 type: string
 *                 format: date-time
 *                 example: '2025-09-10T10:00:00Z'
 *               categoryId:
 *                 type: string
 *                 example: clx0k8s4a0000abcde123457
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["noticias", "tecnologia"]
 *     responses:
 *       201:
 *         description: Artigo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: clx0k8s4a0000abcde123456
 *                 title:
 *                   type: string
 *                   example: Meu Primeiro Artigo
 *                 slug:
 *                   type: string
 *                   example: meu-primeiro-artigo
 *                 subtitle:
 *                   type: string
 *                   example: Um subtítulo interessante
 *                 content:
 *                   type: string
 *                   example: Conteúdo completo do artigo.
 *                 coverImage:
 *                   type: string
 *                   example: https://example.com/image.jpg
 *                 status:
 *                   type: string
 *                   enum: [DRAFT, SCHEDULED, PUBLISHED]
 *                   example: DRAFT
 *                 publishedAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2025-09-10T10:00:00Z'
 *                 authorId:
 *                   type: string
 *                   example: clx0k8s4a0000abcde123456
 *                 categoryId:
 *                   type: string
 *                   example: clx0k8s4a0000abcde123457
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: clx0k8s4a0000abcde123459
 *                       name:
 *                         type: string
 *                         example: noticias
 *                 viewsCount:
 *                   type: integer
 *                   example: 0
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2025-09-10T09:00:00Z'
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2025-09-10T09:00:00Z'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: O título já está em uso.
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authenticateToken, authorizeRoles([Role.JOURNALIST, Role.EDITOR]), validate(articleSchema), create);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Lista todos os artigos
 *     tags: [Artigos]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrar artigos por nome da categoria
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar artigos por título ou conteúdo
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página para paginação
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Limite de artigos por página
 *     responses:
 *       200:
 *         description: Uma lista de artigos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: clx0k8s4a0000abcde123456
 *                   title:
 *                     type: string
 *                     example: Meu Primeiro Artigo
 *                   slug:
 *                     type: string
 *                     example: meu-primeiro-artigo
 *                   subtitle:
 *                     type: string
 *                     example: Um subtítulo interessante
 *                   content:
 *                     type: string
 *                     example: Conteúdo completo do artigo.
 *                   coverImage:
 *                     type: string
 *                     example: https://example.com/image.jpg
 *                   status:
 *                     type: string
 *                     enum: [DRAFT, SCHEDULED, PUBLISHED]
 *                     example: PUBLISHED
 *                   publishedAt:
 *                     type: string
 *                     format: date-time
 *                     example: '2025-09-10T10:00:00Z'
 *                   authorId:
 *                     type: string
 *                     example: clx0k8s4a0000abcde123456
 *                   categoryId:
 *                     type: string
 *                     example: clx0k8s4a0000abcde123457
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: clx0k8s4a0000abcde123459
 *                         name:
 *                           type: string
 *                           example: noticias
 *                   viewsCount:
 *                     type: integer
 *                     example: 150
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: '2025-09-10T09:00:00Z'
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: '2025-09-10T11:00:00Z'
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', list);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Obtém um artigo por ID
 *     tags: [Artigos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: clx0k8s4a0000abcde123456
 *         description: ID do artigo
 *     responses:
 *       200:
 *         description: Detalhes do artigo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: clx0k8s4a0000abcde123456
 *                 title:
 *                   type: string
 *                   example: Meu Primeiro Artigo
 *                 slug:
 *                   type: string
 *                   example: meu-primeiro-artigo
 *                 subtitle:
 *                   type: string
 *                   example: Um subtítulo interessante
 *                 content:
 *                   type: string
 *                   example: Conteúdo completo do artigo.
 *                 coverImage:
 *                   type: string
 *                   example: https://example.com/image.jpg
 *                 status:
 *                   type: string
 *                   enum: [DRAFT, SCHEDULED, PUBLISHED]
 *                   example: PUBLISHED
 *                 publishedAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2025-09-10T10:00:00Z'
 *                 authorId:
 *                   type: string
 *                   example: clx0k8s4a0000abcde123456
 *                 categoryId:
 *                   type: string
 *                   example: clx0k8s4a0000abcde123457
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: clx0k8s4a0000abcde123459
 *                       name:
 *                         type: string
 *                         example: noticias
 *                 viewsCount:
 *                   type: integer
 *                   example: 150
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2025-09-10T09:00:00Z'
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2025-09-10T11:00:00Z'
 *       404:
 *         description: Artigo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Artigo não encontrado.
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Atualiza um artigo existente
 *     tags: [Artigos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do artigo a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Novo Título do Artigo
 *               subtitle:
 *                 type: string
 *                 example: Novo Subtítulo
 *               content:
 *                 type: string
 *                 example: Conteúdo atualizado do artigo.
 *               coverImage:
 *                 type: string
 *                 example: http://example.com/new-image.jpg
 *               status:
 *                 type: string
 *                 enum: [DRAFT, SCHEDULED, PUBLISHED]
 *                 example: PUBLISHED
 *               publishedAt:
 *                 type: string
 *                 format: date-time
 *                 example: '2025-09-11T12:00:00Z'
 *               categoryId:
 *                 type: string
 *                 example: clx0k8s4a0000abcde123458
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["noticias", "tecnologia"]
 *     responses:
 *       200:
 *         description: Artigo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: clx0k8s4a0000abcde123456
 *                 title:
 *                   type: string
 *                   example: Novo Título do Artigo
 *                 slug:
 *                   type: string
 *                   example: novo-titulo-do-artigo
 *                 status:
 *                   type: string
 *                   enum: [DRAFT, SCHEDULED, PUBLISHED]
 *                   example: PUBLISHED
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: '2025-09-11T12:00:00Z'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: O título já está em uso.
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 *       404:
 *         description: Artigo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Artigo não encontrado.
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authenticateToken, authorizeRoles([Role.JOURNALIST, Role.EDITOR]), validate(articleSchema.partial()), update);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Remove um artigo
 *     tags: [Artigos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: clx0k8s4a0000abcde123456
 *         description: ID do artigo a ser removido
 *     responses:
 *       204:
 *         description: Artigo removido com sucesso (No Content)
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 *       404:
 *         description: Artigo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Artigo não encontrado.
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authenticateToken, authorizeRoles([Role.JOURNALIST, Role.EDITOR]), remove);

export default router;



