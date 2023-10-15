const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET*/
router.get('/', async function(req, res, next) {
  try {
    const passageiros = await prisma.passageiro.findMany();
    res.json(passageiros);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Erro ao recuperar passageiros."})
  }
});

/* POST */
router.post("/cadastrar", async (req, res, next) => {
  try {
    const { cpf, nome, nascimento, sexo, email, telefone, endereco, cidade, estado } = req.body;

    const novoPassageiro = await prisma.passageiro.create({
      data: {
        cpf,
        nome,
        nascimento,
        sexo,
        email,
        telefone,
        endereco,
        cidade,
        estado 
      },
    });

    res.json(novoPassageiro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar passageiro!"});
  }
});

/*GET através do ID*/
router.get('/:id', async (req, res) =>{
  try {
    const id = Number(req.params.id);
    const idPassageiro = await prisma.passageiro.findUnique({
      where: {
        id: id
      }
    });
    res.json(idPassageiro)
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Passageiro não encontrado!"})
  }
});

/*Metodo patch*/
router.patch('/:id', async (req, res) =>{
  try {
  const id = Number(req.params.id);
  const data = req.body;
  const atualizarPassageiro = await prisma.passageiro.update({
    where: {
      id: id
    },
    data: data
  });
  res.json(atualizarPassageiro);
}
catch (error){
  console.log(error);
  res.status(404).json({ error: "Erro ao atualizar passageiro!"});
}
});

/*Delete*/
router.delete('/:id', async (req, res)=>{
  try {
    const id = Number(req.params.id);
    await prisma.passageiro.delete({
      where:{
        id: id
      }
    });
    res.status(204).end();
  } catch (error) {
    console.log(error);
  res.status(500).json({error: "Erro ao excluir passageiro."})
  }
});

/*Para todas as rotas não existentes*/
router.all('*', (req, res) =>{
  res.status(501).end();
});

module.exports = router;
