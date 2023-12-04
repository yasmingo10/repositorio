const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const motoristasRouter = require('./routes/motoristas')
const linhasRouter = require('./routes/linhas')
const onibusRouter = require('./routes/onibus')
const passageirosRouter = require('./routes/passageiros')
const recargasRouter = require('./routes/recargas')

const app = express();

const corsOptions = {
  origin: "http://localhost:4000",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/motoristas', motoristasRouter);
app.use('/linhas', linhasRouter);
app.use('/onibus', onibusRouter);
app.use('/passageiros', passageirosRouter);
app.use('/recargas', recargasRouter);

module.exports = app;