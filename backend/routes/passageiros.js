const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtém todos os passageiros
router.get('/', async function(req, res, next) {
  try {
    const passageiros = await prisma.passageiro.findMany();
    res.json(passageiros);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Cria um novo passageiro
router.post('/cadastrar', async function(req, res, next) {
  try {
    const {
      user_id,
      cpf,
      nome,
      nascimento,
      sexo,
      email,
      telefone,
      endereco,
      cidade,
      estado,
      cartao,
    } = req.body;
    console.log(req.body);
    const novoPassageiro = await prisma.passageiro.create({
      data: {
        user_id,
        cpf,
        nome,
        nascimento,
        sexo,
        email,
        telefone,
        endereco,
        cidade,
        estado,
        cartao: cartao ? { create: cartao } : undefined,
      },
    });
    res.json(novoPassageiro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar passageiro!' });
  }
});

// Obtém um passageiro pelo ID
router.get('/:id', async function(req, res, next) {
  try {
    const id = Number(req.params.id);
    const passageiro = await prisma.passageiro.findUnique({
      where: {
        id: id,
      },
    });
    res.json(passageiro);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: 'Passageiro não encontrado!' });
  }
});

// Atualiza um passageiro pelo ID
router.patch('/:id', async function(req, res, next) {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const atualizarPassageiro = await prisma.passageiro.update({
      where: {
        id: id,
      },
      data: data,
    });
    res.json(atualizarPassageiro);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: 'Erro ao atualizar passageiro!' });
  }
});

// Deleta um passageiro pelo ID
router.delete('/:id', async function(req, res, next) {
  try {
    const id = Number(req.params.id);
    await prisma.passageiro.delete({
      where: {
        id: id,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao excluir passageiro.' });
  }
});

// Rota para qualquer outro método não suportado
router.all('*', (req, res) => {
  res.status(501).end();
});

module.exports = router;
