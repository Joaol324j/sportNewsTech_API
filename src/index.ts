import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import articleRoutes from './routes/articleRoutes';
import categoryRoutes from './routes/categoryRoutes';
import tagRoutes from './routes/tagRoutes';
import { swaggerDocs } from './config/swagger';

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);

app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

swaggerDocs(app, PORT);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
