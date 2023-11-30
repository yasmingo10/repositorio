const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET*/
router.get('/listar', async function(req, res, next) {
  try {
    const linhas = await prisma.linha.findMany();
    res.json(linhas);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Erro ao recuperar linhas."})
  }
});

/* POST */
router.post("/cadastrar", async (req, res, next) => {
  try {
    const nome = req.body.nome || null;
    const localsaida = req.body.localsaida || null;
    const localdestino =req.body.localdestino || null;
    const isValidTime = (str) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(str);

    const horariosaida = isValidTime(req.body.horariosaida)
      ? new Date(`1970-01-01T${req.body.horariosaida}:00`).toISOString()
      : null;

    const horariochegada = isValidTime(req.body.horariochegada)
      ? new Date(`1970-01-01T${req.body.horariochegada}:00`).toISOString()
      : null;
    const data = { nome, localsaida, localdestino, horariosaida, horariochegada };

    const linha = await prisma.linha.create({ data });

    res.json(linha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar linha!"});
  }
});

/*GET através do ID*/
router.get('/exibir/:id', async (req, res) =>{
  try {
    const id = Number(req.params.id);
    const idLinha = await prisma.linha.findUnique({
      where: {
        id: id
      }
    });
    res.json(idLinha)
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Linha não encontrada!"})
  }
});

/*Metodo patch*/
router.patch('/editar/:id', async (req, res) =>{
  try {
  const id = Number(req.params.id);
  const data = req.body;
  const atualizarLinha = await prisma.linha.update({
    where: {
      id: id
    },
    data: data
  });
  res.json(atualizarLinha);
}
catch (error){
  console.log(error);
  res.status(404).json({ error: "Erro ao atualizar linnha!"});
}
});

/*Delete*/
router.delete('/excluir/:id', async (req, res)=>{
  try {
    const id = Number(req.params.id);
    await prisma.linha.delete({
      where:{
        id: id
      }
    });
    res.status(204).end();
  } catch (error) {
    console.log(error);
  res.status(500).json({error: "Erro ao excluir linha."})
  }
});

/*Para todas as rotas não existentes*/
router.all('*', (req, res) =>{
  res.status(501).end();
});

module.exports = router;
