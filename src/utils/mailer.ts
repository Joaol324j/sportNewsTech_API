import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordResetEmail = async (to: string, token: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Redefinição de Senha SportNews',
    html: `
      <p>Você solicitou uma redefinição de senha para sua conta SportNews.</p>
      <p>Por favor, clique no link abaixo para redefinir sua senha:</p>
      <p><a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">Redefinir Senha</a></p>
      <p>Este link expirará em 1 hora.</p>
      <p>Se você não solicitou isso, por favor, ignore este e-mail.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
