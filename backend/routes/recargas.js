const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

   

    const novaRecarga = await prisma.recarga.create({
      data: {
        valor: parseFloat(valor),
        data,
        passageiro: {
          connect: { id: passageiro.id },
        },
      },
    });
    
    const novoSaldo = parseFloat(valor) + passageiro.saldo;

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
