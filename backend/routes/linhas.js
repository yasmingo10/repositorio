const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET*/
router.get('/', async function(req, res, next) {
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
    const { nome, localsaida, localdestino, horariosaida, horariochegada } = req.body;

    const novaLinha = await prisma.linha.create({
      data: {
        nome,
        localsaida, 
        localdestino, 
        horariosaida, 
        horariochegada 
      },
    });

    res.json(novaLinha);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar linha!"});
  }
});

/*GET através do ID*/
router.get('/:id', async (req, res) =>{
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
router.patch('/:id', async (req, res) =>{
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
router.delete('/:id', async (req, res)=>{
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
