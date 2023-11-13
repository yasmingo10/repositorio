var express = require("express");
var router = express.Router();

router.get("/cadastrados", function (req, res, next) {
  res.render('pages/ui-features/motorista/cadastrados', {  root: 'corona/pages/ui-features/motorista' });
});

router.get("/cadastrar", function (req, res, next) {
  res.render('pages/ui-features/motorista/cadastrar', { root: 'corona/pages/ui-features/motorista' });
});

router.get("/exibir/:id", function (req, res, next) {
  const id = req.params.id;
  res.render('pages/ui-features/motorista/exibir', { root: 'corona/pages/ui-features/motorista' });
});

router.get("/editar/:id", function (req, res, next) {
  const id = req.params.id;
  res.render('pages/ui-features/motorista/editar', { root: 'corona/pages/ui-features/motorista' });
});

router.get("/deletar/:id", function (req, res, next) {
  const id = req.params.id;
  res.render('pages/ui-features/motorista/editar', { root: 'corona/pages/ui-features/motorista' });
});

module.exports = router;
