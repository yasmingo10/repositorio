const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET*/
router.get('/', async function(req, res, next) {
  try {
    const onibus = await prisma.onibus.findMany();
    res.json(onibus);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Erro ao recuperar onibus."})
  }
});

/* POST */
router.post("/cadastrar", async (req, res, next) => {
  try {
    const { placa } = req.body;

    const novoOnibus = await prisma.onibus.create({
      data: {
        placa 
      },
    });

    res.json(novoOnibus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar onibus!"});
  }
});

/*GET através do ID*/
router.get('/:id', async (req, res) =>{
  try {
    const id = Number(req.params.id);
    const idOnibus = await prisma.onibus.findUnique({
      where: {
        id: id
      }
    });
    res.json(idOnibus)
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Onibus não encontrado!"})
  }
});

/*Metodo patch*/
router.patch('/:id', async (req, res) =>{
  try {
  const id = Number(req.params.id);
  const data = req.body;
  const atualizarOnibus = await prisma.onibus.update({
    where: {
      id: id
    },
    data: data
  });
  res.json(atualizarOnibus);
}
catch (error){
  console.log(error);
  res.status(404).json({ error: "Erro ao atualizar onibus!"});
}
});

/*Delete*/
router.delete('/:id', async (req, res)=>{
  try {
    const id = Number(req.params.id);
    await prisma.onibus.delete({
      where:{
        id: id
      }
    });
    res.status(204).end();
  } catch (error) {
    console.log(error);
  res.status(500).json({error: "Erro ao excluir onibus."})
  }
});

/*Para todas as rotas não existentes*/
router.all('*', (req, res) =>{
  res.status(501).end();
});

module.exports = router;
