import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const createTag = async (name: string) => {
  const tag = await prisma.tag.create({
    data: { name },
  });
  return tag;
};

export const getTags = async () => {
  const tags = await prisma.tag.findMany();
  return tags;
};

export const getTagById = async (id: string) => {
  const tag = await prisma.tag.findUnique({ where: { id } });
  return tag;
};

export const updateTag = async (id: string, name: string) => {
  const tag = await prisma.tag.update({
    where: { id },
    data: { name },
  });
  return tag;
};

export const deleteTag = async (id: string) => {
  await prisma.tag.delete({ where: { id } });
};

