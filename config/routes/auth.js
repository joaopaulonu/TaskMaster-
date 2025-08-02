// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Simulação de banco de dados
const users = [];

// Rota de Registro
// POST /auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifica se o usuário já existe
    let user = users.find(u => u.username === username);
    if (user) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cria e salva o novo usuário (simulado)
    user = { id: users.length + 1, username, password: hashedPassword };
    users.push(user);

    // Retorna mensagem de sucesso
    res.status(201).json({ msg: 'Usuário registrado com sucesso' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Rota de Login
// POST /auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Procura o usuário
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Compara a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Cria o token JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: 3600 }, // Expira em 1 hora
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
