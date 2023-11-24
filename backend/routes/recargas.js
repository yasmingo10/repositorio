const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET*/
router.get('/', async function(req, res, next) {
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
    const { valor, data  } = req.body;

    const novaRecarga = await prisma.recarga.create({
      data: {
        valor,
         data
      },
    });

    res.json(novaRecarga);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao efetuar recarga"});
  }
});

/*GET através do ID*/
router.get('/:id', async (req, res) =>{
  try {
    const id = Number(req.params.id);
    const idRecarga = await prisma.recarga.findUnique({
      where: {
        id: id
      }
    });
    res.json(idRecarga)
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Recarga não encontrada"})
  }
});

/*Metodo patch*/
router.patch('/:id', async (req, res) =>{
  try {
  const id = Number(req.params.id);
  const data = req.body;
  const atualizarRecarga = await prisma.recarga.update({
    where: {
      id: id
    },
    data: data
  });
  res.json(atualizarRecarga);
}
catch (error){
  console.log(error);
  res.status(404).json({ error: "Erro ao editar recarga!"});
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
