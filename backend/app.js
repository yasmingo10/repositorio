const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const motoristasRouter = require('./routes/motoristas')
const linhasRouter = require('./routes/linhas')
const onibusRouter = require('./routes/onibus')
const passageirosRouter = require('./routes/passageiros')
const recargasRouter = require('./routes/recargas')
const cartoesRouter = require('./routes/cartoes')
const viagensRouter =require('./routes/viagens')

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  };

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/motoristas', motoristasRouter);
app.use('/linhas', linhasRouter);
app.use('/onibus', onibusRouter);
app.use('/passageiros', passageirosRouter);
app.use('/recargas', recargasRouter);
app.use('/cartoes', cartoesRouter);
app.use('/viagens', viagensRouter);

module.exports = app;