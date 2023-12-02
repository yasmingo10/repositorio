const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET*/
router.get('/listar', async function(req, res, next) {
  try {
    const recargas = await prisma.recarga.findMany();
    res.json(recargas);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Erro ao recuperar recargas."})
  }
});

/* POST */
router.post("/recarregar", async (req, res, next) => {
  try {
    console.log('Recebendo requisição de recarga:', req.body);

    const { cpf, valor, data } = req.body;

    const passageiro = await prisma.passageiro.findUnique({
      where: { cpf },
    });

    if (!passageiro) {
      return res.status(404).json({ error: "Passageiro não encontrado" });
    }

    const novoSaldo = passageiro.saldo + parseFloat(valor);

    await prisma.passageiro.update({
      where: { id: passageiro.id },
      data: { saldo: novoSaldo },
    });

    const novaRecarga = await prisma.recarga.create({
      data: {
        valor: parseFloat(valor),
        data,
        passageiro: {
          connect: { id: passageiro.id },
        },
      },
    });

    // Retorne as informações desejadas em um único objeto JSON
    res.json({
      passageiro: { nome: passageiro.nome },
      valor: parseFloat(valor),
      recarga: novaRecarga,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao efetuar recarga" });
  }
});

/*Delete*/
router.delete('/:id', async (req, res)=>{
  try {
    const id = Number(req.params.id);
    await prisma.recarga.delete({
      where:{
        id: id
      }
    });
    res.status(204).end();
  } catch (error) {
    console.log(error);
  res.status(500).json({error: "Erro ao excluir recargali."})
  }
});

/*Para todas as rotas não existentes*/
router.all('*', (req, res) =>{
  res.status(501).end();
});

module.exports = router;
