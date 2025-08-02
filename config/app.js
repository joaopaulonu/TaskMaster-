// app.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// Middleware para processar JSON
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Mensagem de boas-vindas
app.get('/', (req, res) => {
  res.send('Bem-vindo ao MesaJá - Servidor de Gerenciamento de Tarefas!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
