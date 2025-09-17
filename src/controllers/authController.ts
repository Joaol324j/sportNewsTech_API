
import { Request, Response } from 'express';
import { registerUser, loginUser, requestPasswordReset, resetPassword } from '../services/authService';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../types/auth';
import * as authService from '../services/authService';

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

export const forgotPassword = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    const resetToken = await requestPasswordReset(email);
    res.status(200).json({ message: 'Token de redefinição de senha solicitado com sucesso.', resetToken });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { token, newPassword } = req.body;

  try {
    await resetPassword(token, newPassword);
    res.status(200).json({ message: 'Senha redefinida com sucesso.' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Não autorizado.' });
    }
    const user = await authService.getProfile(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.status(200).json({ id: user.id, username: user.username, email: user.email, role: user.role });
  } catch (error) {
    console.error('Erro ao obter perfil do usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};


