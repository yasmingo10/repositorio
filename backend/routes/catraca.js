const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post('/verificar-saldo', async (req, res) => {
  const { numeroCartao } = req.body;
  const valorPassagem = 5; 

  try {

    const passageiro = await prisma.passageiro.findUnique({
        where: { numeroCartao },
    });

    if (!passageiro) {
      return res.status(404).json({ error: 'Passageiro não encontrado' });
    }

    const saldoSuficiente = passageiro.saldo >= valorPassagem;

    if (saldoSuficiente) {
      const novoSaldo = (passageiro.saldo - valorPassagem).toFixed(2);

      await prisma.passageiro.update({
        where: { id: passageiro.id },
        data: { saldo: novoSaldo },
      });

      res.status(200).json({ saldoSuficiente: true });
    } else {
      res.status(403).json({ error: 'Saldo insuficiente. Faça uma recarga.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao verificar saldo' });
  }
});

module.exports = router;
