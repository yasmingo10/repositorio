const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtém todos os passageiros
router.get('/listar', async function(req, res, next) {
  try {
    const passageiros = await prisma.passageiro.findMany();
    res.json(passageiros);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

// Cria um novo passageiro
router.post('/cadastrar', async function(req, res, next) {
  try {
    const {
      cpf,
      nome,
      nascimento,
      sexo,
      email,
      telefone,
      endereco,
      cidade,
      estado,
      saldo,
      recarga: recargaData // Renomeie para evitar conflitos de nomes
    } = req.body;

    // Crie o passageiro
    const novoPassageiro = await prisma.passageiro.create({
      data: {
        cpf,
        nome,
        nascimento,
        sexo,
        email,
        telefone,
        endereco,
        cidade,
        estado,
        saldo
      }
    });

    // Se houver dados de recarga, crie a recarga e associe ao passageiro
    if (recargaData) {
      const novaRecarga = await prisma.recarga.create({
        data: {
          // Inclua os campos relevantes da recarga aqui
          // Exemplo: valor, data, etc.
          // recarga: recargaData
        }
      });

      // Associe a recarga recém-criada ao passageiro
      await prisma.passageiro.update({
        where: {
          id: novoPassageiro.id
        },
        data: {
          recarga: {
            connect: {
              id: novaRecarga.id
            }
          }
        }
      });
    }

    res.json(novoPassageiro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar passageiro!' });
    next(error);
  }
});


// Obtém um passageiro pelo ID
router.get('/exibir/:id', async function(req, res, next) {
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
router.patch('/editar/:id', async function(req, res, next) {
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
router.delete('/excluir/:id', async function(req, res, next) {
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
