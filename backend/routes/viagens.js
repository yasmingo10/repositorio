const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtém todas as viagens
router.get('/viagens', async function(req, res, next) {
  try {
    const viagens = await prisma.viagem.findMany();
    res.json(viagens);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Cria uma nova viagem
router.post('/viagens/cadastrar', async function(req, res, next) {
  try {
    const { datahora, linha_id, motorista_id, onibus_id } = req.body;

    const novaViagem = await prisma.viagem.create({
      data: {
        datahora,
        linha_id,
        motorista_id,
        onibus_id,
      },
    });
    res.json(novaViagem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar viagem!' });
  }
});

// Obtém uma viagem pelo ID
router.get('/viagens/:id', async function(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const viagem = await prisma.viagem.findUnique({
      where: {
        id,
      },
    });
    if (viagem === null) {
      res.status(404).json({ error: 'Viagem não encontrada' });
    } else {
      res.json(viagem);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar viagem!' });
  }
});

// Atualiza uma viagem pelo ID
router.put('/viagens/:id', async function(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { datahora, linha_id, motorista_id, onibus_id } = req.body;

    const updatedViagem = await prisma.viagem.update({
      where: {
        id,
      },
      data: {
        datahora,
        linha_id,
        motorista_id,
        onibus_id,
      },
    });
    res.json(updatedViagem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar viagem!' });
  }
});

// Deleta uma viagem pelo ID
router.delete('/viagens/:id', async function(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await prisma.viagem.delete({
      where: {
        id,
      },
    });
    res.json({ message: 'Viagem deletada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar viagem!' });
  }
});

// Rota para qualquer outro método não suportado
router.all('*', (req, res) => {
  res.status(501).end();
});

module.exports = router;
