const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtém todos os cartões
router.get('/cartoes', async function(req, res, next) {
  try {
    const cartoes = await prisma.cartao.findMany();
    res.json(cartoes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Cria um novo cartão
router.post('/cartoes/cadastrar', async function(req, res, next) {
  try {
    const { tipo, saldo, viagem_id } = req.body;

    const novoCartao = await prisma.cartao.create({
      data: {
        tipo,
        saldo,
        viagem_id,
      },
    });
    res.json(novoCartao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar cartão!' });
  }
});

// Obtém todos os usuários
router.get('/users', async function(req, res, next) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Cria um novo usuário
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

// Rota para qualquer outro método não suportado
router.all('*', (req, res) => {
  res.status(501).end();
});

module.exports = router;
