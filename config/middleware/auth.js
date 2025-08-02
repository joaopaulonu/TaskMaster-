// middleware/auth.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  // Pega o token do cabeçalho da requisição
  const token = req.header('x-auth-token');

  // Se não houver token, retorna erro
  if (!token) {
    return res.status(401).json({ msg: 'Nenhum token, autorização negada.' });
  }

  // Verifica o token
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token não é válido.' });
  }
};
