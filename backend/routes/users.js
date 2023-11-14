const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/users', async function(req, res, next) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/users/cadastrar', async function(req, res, next) {
  try {
    const { nome, email, telefone, senha } = req.body;

    const novoUser = await prisma.user.create({
      data: {
        nome,
        email,
        telefone,
        senha,
      },
    });
    res.json(novoUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário!' });
  }
});

router.get('/users/:id', async function(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user === null) {
      res.status(404).json({ error: 'Usuário não encontrado' });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuário!' });
  }
});

router.put('/users/:id', async function(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { nome, email, telefone, senha } = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        nome,
        email,
        telefone,
        senha,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar usuário!' });
  }
});

router.delete('/users/:id', async function(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await prisma.user.delete({
      where: {
        id,
      },
    });
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar usuário!' });
  }
});

router.all('*', (req, res) => {
  res.status(501).end();
});

module.exports = router;
