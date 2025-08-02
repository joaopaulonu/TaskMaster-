// routes/tasks.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Simulação de banco de dados de tarefas
const tasks = [];
let taskIdCounter = 1;

// Rota para criar uma tarefa
// POST /tasks
router.post('/', auth, (req, res) => {
  const { title, description, completed = false } = req.body;
  const newtask = { id: taskIdCounter++, userId: req.user.id, title, description, completed };
  tasks.push(newtask);
  res.status(201).json(newtask);
});

// Rota para listar tarefas do usuário
// GET /tasks
router.get('/', auth, (req, res) => {
  const userTasks = tasks.filter(t => t.userId === req.user.id);
  res.json(userTasks);
});

// Rota para obter uma tarefa específica
// GET /tasks/:id
router.get('/:id', auth, (req, res) => {
  const task = tasks.find(t => t.id == req.params.id && t.userId === req.user.id);
  if (!task) {
    return res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
  res.json(task);
});

// Rota para atualizar uma tarefa
// PUT /tasks/:id
router.put('/:id', auth, (req, res) => {
  const task = tasks.find(t => t.id == req.params.id && t.userId === req.user.id);
  if (!task) {
    return res.status(404).json({ msg: 'Tarefa não encontrada' });
  }

  const { title, description, completed } = req.body;
  if (title) task.title = title;
  if (description) task.description = description;
  if (typeof completed !== 'undefined') task.completed = completed;
  
  res.json(task);
});

// Rota para deletar uma tarefa
// DELETE /tasks/:id
router.delete('/:id', auth, (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id == req.params.id && t.userId === req.user.id);
  if (taskIndex === -1) {
    return res.status(404).json({ msg: 'Tarefa não encontrada' });
  }

  tasks.splice(taskIndex, 1);
  res.json({ msg: 'Tarefa removida com sucesso' });
});

module.exports = router;
