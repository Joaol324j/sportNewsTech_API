import { Request, Response } from 'express';
import { createArticle, getArticleById, updateArticle, deleteArticle, getAllArticles, incrementArticleViews } from '../services/articleService';
import { Role, ArticleStatus } from '../generated/prisma';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: Role;
  };
}

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const authorId = req.user?.userId;
    if (!authorId) {
      return res.status(401).json({ message: 'Não autenticado.' });
    }
    const article = await createArticle(authorId, req.body);
    res.status(201).json(article);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const article = await getArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Artigo não encontrado.' });
    }
    if (article.status === ArticleStatus.PUBLISHED) {
      await incrementArticleViews(req.params.id);
    }
    res.status(200).json(article);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const userRole = req.user?.role;
    const article = await getArticleById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Artigo não encontrado.' });
    }

    if (userRole === Role.JOURNALIST && article.authorId !== userId) {
      return res.status(403).json({ message: 'Acesso negado: Você não tem permissão para editar este artigo.' });
    }

    const updatedArticle = await updateArticle(req.params.id, req.body);
    res.status(200).json(updatedArticle);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const userRole = req.user?.role;
    const article = await getArticleById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Artigo não encontrado.' });
    }

    if (userRole === Role.JOURNALIST && article.authorId !== userId) {
      return res.status(403).json({ message: 'Acesso negado: Você não tem permissão para excluir este artigo.' });
    }

    await deleteArticle(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const filter = req.query;
    const { articles, totalArticles, page, limit } = await getAllArticles(filter);
    res.status(200).json({ articles, totalArticles, page, limit });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
