
import { Router } from 'express';
import {register, login, forgotPassword, resetPasswordController} from '../controllers/authController';
import {validate, registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema} from '../utils/validation';
import authMiddleware from '../middleware/authMiddleware';
import { getProfile } from '../controllers/authController';

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

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Solicita um token de redefinição de senha
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@example.com
 *     responses:
 *       200:
 *         description: Token de redefinição de senha solicitado com sucesso
 *       400:
 *         description: Usuário não encontrado ou dados inválidos
 */
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Redefine a senha do usuário com um token
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de redefinição de senha recebido por e-mail
 *                 example: "some_long_hex_token"
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: MinhaNovaSenhaSecreta123
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Token inválido ou expirado, ou dados inválidos
 */
router.post('/reset-password', validate(resetPasswordSchema), resetPasswordController);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Obtém o perfil do usuário logado
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *                   enum: [USER, EDITOR, JOURNALIST]
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Não autorizado.
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/me', authMiddleware, getProfile);

export default router;


