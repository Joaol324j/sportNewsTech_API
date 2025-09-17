
import { PrismaClient, Role } from '../generated/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '../utils/mailer';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const registerUser = async (userData: any) => {
  const { email, username, password, role } = userData;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Usuário com este e-mail já existe.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      role: role || Role.USER,
    },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Credenciais inválidas.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Credenciais inválidas.');
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

  return { user, token };
};

export const requestPasswordReset = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Usuário não encontrado.');
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = await bcrypt.hash(resetToken, 10);
  const expiresAt = new Date(Date.now() + 3600000); 

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt,
    },
  });

  await sendPasswordResetEmail(user.email, resetToken);

  return resetToken; 
};

export const resetPassword = async (token: string, newPassword: string) => {
  const resetTokens = await prisma.passwordResetToken.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
      user: true,
    },
  });

  let validToken = null;
  for (const rt of resetTokens) {
    const isTokenValid = await bcrypt.compare(token, rt.tokenHash);
    if (isTokenValid) {
      validToken = rt;
      break;
    }
  }

  if (!validToken) {
    throw new Error('Token de redefinição de senha inválido ou expirado.');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: validToken.userId },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({
    where: { id: validToken.id },
  });
};


