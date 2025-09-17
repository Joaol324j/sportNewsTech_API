import { z, ZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { Role, ArticleStatus } from '../generated/prisma';

export const registerSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido.'),
  username: z.string().trim().min(1, 'O nome de usuário é obrigatório.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  role: z.nativeEnum(Role).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido.'),
  password: z.string().min(1, 'A senha é obrigatória.'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido.'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'O token é obrigatório.'),
  newPassword: z.string().min(6, 'A nova senha deve ter pelo menos 6 caracteres.'),
});

export const articleSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  subtitle: z.string().optional(),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  coverImage: z.string().url('Imagem de capa deve ser uma URL válida').optional(),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  tags: z.array(z.string()).optional(),
  status: z.nativeEnum(ArticleStatus).optional(),
  publishedAt: z.preprocess((arg) => (typeof arg === 'string' ? new Date(arg) : undefined), z.date().optional()),
});

export const categorySchema = z.object({
  name: z.string().trim().min(1, 'O nome da categoria é obrigatório.'),
});

export const tagSchema = z.object({
  name: z.string().trim().min(1, 'O nome da tag é obrigatório.'),
});

export const validate = (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  };
