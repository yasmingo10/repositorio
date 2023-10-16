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

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/motoristas', motoristasRouter);
app.use('/linhas', linhasRouter);
app.use('/onibus', onibusRouter);
app.use('/passageiros', passageirosRouter);

module.exports = app;