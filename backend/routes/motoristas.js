const express = require('express');
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const upload = require('../middleware/fileUpload')

/* GET*/
router.get('/listar', async function(req, res, next) {
  try {
    const motoristas = await prisma.motorista.findMany();
    res.json(motoristas);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message})
  }
});

/* POST */
router.post("/cadastrar", upload.single("foto"), async (req, res) => {
  try {
    const nome = req.body.nome || null;
    const nascimento = new Date(req.body.nascimento).toISOString();
    const sexo = req.body.sexo || null;
    const foto = req.file?.path;
    const admissao = new Date(req.body.admissao).toISOString();
    
    const data = { nome, nascimento, sexo, foto, admissao };

    const motorista = await prisma.motorista.create({ data });
    console.log(req.file);
    res.json({ motorista });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Não foi possível realizar o cadastro do motorista." });
  }
});

/*GET através do ID*/
router.get('/exibir/:id', async (req, res) =>{
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
router.patch('/editar/:id', async (req, res) =>{
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
router.delete('/excluir/:id', async (req, res)=>{
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

router.get('/quantidadeTotal', async (req, res) => {
  try {
      const quantidadeTotal = await prisma.motorista.count();
      res.json(quantidadeTotal);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao obter a quantidade total de motoristas cadastrados." });
  }
});

module.exports = router;
