var express = require('express');
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const motoristas = await prisma.motorista.findMany();
  res.json(motoristas);
});

/* POST home page. */
router.post("/cadastrar", async (req, res, next) =>{
  try {
    const { nome, nascimento, sexo, foto, admissao } = req.body;

    const novoMotorista = await prisma.motorista.create({
      data: {
        nome,
        nascimento, 
        sexo, 
        foto, 
        admissao 
      },
    });

    res.json(novoMotorista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar motorista."});
  }
});

module.exports = router;