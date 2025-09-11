import { Request, Response } from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../services/categoryService';

export const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await createCategory(name);
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }
    res.status(200).json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const updatedCategory = await updateCategory(req.params.id, name);
    res.status(200).json(updatedCategory);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await deleteCategory(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

