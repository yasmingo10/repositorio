var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
    res.sendFile("index.html", { root: 'views/admin' });
});

// motoristas

router.get('/motorista/cadastrar', function(req, res, next) {
    res.sendFile("cadastrar.html", { root: 'views/admin/motorista' });
});

router.get('/motorista/exibir/:id', function(req, res, next) {
    res.sendFile("exibir.html", { root: 'views/admin/motorista' });
});

router.get('/motorista/editar/:id', function(req, res, next) {
    res.sendFile("editar.html", { root: 'views/admin/motorista' });
});

router.get('/motorista/excluir/:id', function(req, res, next) {
    res.sendFile("excluir.html", { root: 'views/admin/motorista' });
});

router.get('/motorista/listar', function(req, res, next) {
    res.sendFile("listar.html", { root: 'views/admin/motorista' });
});

    // onibus

router.get('/onibus/cadastrar', function(req, res, next) {
    res.sendFile("cadastrar.html", { root: 'views/admin/onibus' });
});

router.get('/onibus/listar', function(req, res, next) {
    res.sendFile("listar.html", { root: 'views/admin/onibus' });
});

router.get('/onibus/exibir/:id', function(req, res, next) {
    res.sendFile("exibir.html", { root: 'views/admin/onibus' });
});

router.get('/onibus/excluir/:id', function(req, res, next) {
    res.sendFile("excluir.html", { root: 'views/admin/onibus' });
});

router.get('/onibus/editar/:id', function(req, res, next) {
    res.sendFile("editar.html", { root: 'views/admin/onibus' });
});

// linhas

router.get('/linha/cadastrar', function(req, res, next) {
    res.sendFile("cadastrar.html", { root: 'views/admin/linha' });
});

router.get('/linha/listar', function(req, res, next) {
    res.sendFile("listar.html", { root: 'views/admin/linha' });
});

router.get('/linha/exibir/:id', function(req, res, next) {
    res.sendFile("exibir.html", { root: 'views/admin/linha' });
});

router.get('/linha/editar/:id', function(req, res, next) {
    res.sendFile("editar.html", { root: 'views/admin/linha' });
});

router.get('/linha/excluir/:id', function(req, res, next) {
    res.sendFile("excluir.html", { root: 'views/admin/linha' });
});

// passageiro

router.get('/passageiro/cadastrar', function(req, res, next) {
    res.sendFile("cadastrar.html", { root: 'views/admin/passageiro' });
});

router.get('/passageiro/listar', function(req, res, next) {
    res.sendFile("listar.html", { root: 'views/admin/passageiro' });
});

router.get('/passageiro/exibir/:id', function(req, res, next) {
    res.sendFile("exibir.html", { root: 'views/admin/passageiro' });
});

router.get('/passageiro/editar/:id', function(req, res, next) {
    res.sendFile("editar.html", { root: 'views/admin/passageiro' });
});

router.get('/passageiro/excluir/:id', function(req, res, next) {
    res.sendFile("excluir.html", { root: 'views/admin/passageiro' });
});

module.exports = router;