
import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';
import { validationResult } from 'express-validator';

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'Usuário registrado com sucesso', user: { id: user.id, email: user.email, username: user.username } });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ message: 'Login realizado com sucesso', user: { id: user.id, email: user.email, username: user.username }, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


