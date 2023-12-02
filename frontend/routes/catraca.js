var express = require('express');
var router = express.Router();

// Rota para enviar o arquivo HTML
router.get('/', function(req, res, next) {
    res.sendFile("catraca.html", { root: 'views/catraca' });
});

module.exports = router;