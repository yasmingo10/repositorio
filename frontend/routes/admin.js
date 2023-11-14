var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/motorista/cadastrar', function(req, res, next) {
    res.sendFile("cadastrar.html", { root: 'views/admin/motorista' });
});

module.exports = router;