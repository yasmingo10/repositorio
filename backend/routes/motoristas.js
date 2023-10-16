const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET*/
router.get('/', async function(req, res, next) {
  try {
    const motoristas = await prisma.motorista.findMany();
    res.json(motoristas);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message})
  }
});

/* POST */
router.post("/cadastrar", async (req, res, next) => {
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
    res.status(500).json({ error: "Erro ao cadastrar motorista!"});
  }
});

/*GET através do ID*/
router.get('/:id', async (req, res) =>{
  try {
    const id = Number(req.params.id);
    const idMotorista = await prisma.motorista.findUnique({
      where: {
        id: id
      }
    });
    res.json(idMotorista)
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Motorista não encontrado!"})
  }
});

/*Metodo patch*/
router.patch('/:id', async (req, res) =>{
  try {
  const id = Number(req.params.id);
  const data = req.body;
  const atualizarMotorista = await prisma.motorista.update({
    where: {
      id: id
    },
    data: data
  });
  res.json(atualizarMotorista);
}
catch (error){
  console.log(error);
  res.status(404).json({ error: "Erro ao atualizar motorista!"});
}
});

/*Delete*/
router.delete('/:id', async (req, res)=>{
  try {
    const id = Number(req.params.id);
    await prisma.motorista.delete({
      where:{
        id: id
      }
    });
    res.status(204).end();
  } catch (error) {
    console.log(error);
  res.status(500).json({error: "Erro ao excluir motorista."})
  }
});

/*Para todas as rotas não existentes*/
router.all('*', (req, res) =>{
  res.status(501).end();
});

module.exports = router;
