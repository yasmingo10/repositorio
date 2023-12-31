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
router.post('/cadastrar', async function (req, res, next) {
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
          recarga: recargaData,
          numeroCartao,

      } = req.body;

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
              saldo,
            numeroCartao,
          }
      });

      res.json(novoPassageiro);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao cadastrar passageiro!' });
      next(error);
  }
});




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

router.patch('/editar/:id', async (req, res) => {
  try {
    console.log('Dados recebidos no backend:', req.body);
    const id = Number(req.params.id);
    
    const nome = req.body.nome || null;
    const cpf = req.body.cpf || null;
    const nascimento = req.body.nascimento ? new Date(req.body.nascimento) : null;
      const telefone = req.body.telefone || null;
    const email = req.body.email || null;
    const sexo = req.body.sexo || null;
    const endereco = req.body.endereco || null;
    const cidade = req.body.cidade || null;
    const estado = req.body.estado || null;
    const numeroCartao =  req.body.numeroCartao || null;

    const passageiroAtualizado = await prisma.passageiro.update({
      where: { id },
      data: {
        nome,
        cpf,
        nascimento,
        telefone,
        email,
        sexo,
        endereco,
        cidade,
        estado,
        numeroCartao,
      },
    });

    res.json(passageiroAtualizado);
  } catch (error) {
    console.log('Erro no backend:', error);
    res.status(404).json({ error: "Erro ao atualizar Passageiro!" });
  }
});


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

router.all('*', (req, res) => {
  res.status(501).end();
});

module.exports = router;
