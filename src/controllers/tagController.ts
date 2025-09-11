import { Request, Response } from 'express';
import { createTag, getTags, getTagById, updateTag, deleteTag } from '../services/tagService';

export const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const tag = await createTag(name);
    res.status(201).json(tag);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const tags = await getTags();
    res.status(200).json(tags);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const tag = await getTagById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag não encontrada.' });
    }
    res.status(200).json(tag);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const updatedTag = await updateTag(req.params.id, name);
    res.status(200).json(updatedTag);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await deleteTag(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

