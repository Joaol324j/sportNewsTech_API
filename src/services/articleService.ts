import { PrismaClient, ArticleStatus, Role } from '../generated/prisma';
import slugify from 'slugify';

const prisma = new PrismaClient();

interface ArticleData {
  title: string;
  subtitle?: string;
  content: string;
  coverImage?: string;
  categoryId: string;
  tags?: string[];
  status?: ArticleStatus;
  publishedAt?: Date;
}

export const createArticle = async (authorId: string, articleData: ArticleData) => {
  const { title, subtitle, content, coverImage, categoryId, tags, status, publishedAt } = articleData;

  const slug = slugify(title, { lower: true, strict: true });

  const article = await prisma.article.create({
    data: {
      title,
      slug,
      subtitle,
      content,
      coverImage,
      status: status || ArticleStatus.DRAFT,
      publishedAt: status === ArticleStatus.SCHEDULED && publishedAt ? publishedAt : null,
      author: { connect: { id: authorId } },
      category: { connect: { id: categoryId } },
      tags: {
        connectOrCreate: tags?.map(tagName => ({
          where: { name: tagName },
          create: { name: tagName },
        })),
      },
    },
  });

  return article;
};

export const getArticleById = async (id: string) => {
  const article = await prisma.article.findUnique({
    where: { id },
    include: { author: true, category: true, tags: true },
  });
  return article;
};

export const getArticleBySlug = async (slug: string) => {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: { author: true, category: true, tags: true },
  });
  return article;
};

export const updateArticle = async (id: string, articleData: Partial<ArticleData>) => {
  const { title, subtitle, content, coverImage, categoryId, tags, status, publishedAt } = articleData;

  const updateData: any = { subtitle, content, coverImage, status, publishedAt };

  if (title) {
    updateData.title = title;
    updateData.slug = slugify(title, { lower: true, strict: true });
  }

  if (categoryId) {
    updateData.category = { connect: { id: categoryId } };
  }

  if (tags) {
    updateData.tags = {
      set: [], 
      connectOrCreate: tags.map(tagName => ({
        where: { name: tagName },
        create: { name: tagName },
      })),
    };
  }

  const article = await prisma.article.update({
    where: { id },
    data: updateData,
  });

  return article;
};

export const deleteArticle = async (id: string) => {
  await prisma.article.delete({ where: { id } });
};

export const getAllArticles = async (filter?: any) => {
  const { category, tags, search, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = filter || {};

  const where: any = {};
  if (category) {
    where.category = { name: category };
  }
  if (tags) {
    where.tags = { some: { name: { in: tags } } };
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { subtitle: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
    ];
  }

  const articles = await prisma.article.findMany({
    where,
    include: { author: true, category: true, tags: true },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const totalArticles = await prisma.article.count({ where });

  return { articles, totalArticles, page, limit };
};

export const incrementArticleViews = async (id: string) => {
  await prisma.article.update({
    where: { id },
    data: { viewsCount: { increment: 1 } },
  });
};



