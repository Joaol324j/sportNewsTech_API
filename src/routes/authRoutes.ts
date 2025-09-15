
import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { validate, registerSchema, loginSchema } from '../utils/validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Gerenciamento de usuários e autenticação
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@example.com
 *               username:
 *                 type: string
 *                 example: meuusuario
 *               password:
 *                 type: string
 *                 format: password
 *                 example: MinhaSenhaSecreta123
 *               role:
 *                 type: string
 *                 enum: [USER, EDITOR, JOURNALIST]
 *                 example: JOURNALIST
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário registrado com sucesso.
 *       400:
 *         description: Dados inválidos ou email/username já em uso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: O email ou nome de usuário já está em uso.
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/register', validate(registerSchema), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: MinhaSenhaSecreta123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticação JWT
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     username:
 *                       type: string
 *                     role:
 *                       type: string
 *                       enum: [USER, EDITOR, JOURNALIST]
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Credenciais inválidas.
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/login', validate(loginSchema), login);

export default router;


