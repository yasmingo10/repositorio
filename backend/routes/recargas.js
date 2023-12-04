const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/recarregar", async (req, res, next) => {
  const cpf = req.body.cpf;
  const valor = Number(req.body.valor);

  try {
    console.log('Recebendo requisição de recarga:', req.body);

    const passageiro = await prisma.passageiro.findUnique({
      where: { cpf },
    });

    if (!passageiro) {
      return res.status(404).json({ error: "Passageiro não encontrado" });
    }

    // Convertendo o valor para Decimal antes de somar ao saldo
    const novoSaldo = (Number(passageiro.saldo) + Number(valor)).toFixed(2);

    const novaRecarga = await prisma.recarga.create({
      data: {
        valor: parseFloat(valor),
        passageiro: {
          connect: { id: passageiro.id },
        },
      },
    });

    await prisma.passageiro.update({
      where: { id: passageiro.id },
      data: { saldo: novoSaldo },
    });

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



module.exports = router;
