import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const createCategory = async (name: string) => {
  const category = await prisma.category.create({
    data: { name },
  });
  return category;
};

export const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

export const getCategoryById = async (id: string) => {
  const category = await prisma.category.findUnique({ where: { id } });
  return category;
};

export const updateCategory = async (id: string, name: string) => {
  const category = await prisma.category.update({
    where: { id },
    data: { name },
  });
  return category;
};

export const deleteCategory = async (id: string) => {
  await prisma.category.delete({ where: { id } });
};

