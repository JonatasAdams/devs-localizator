const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB!'))
    .catch((err) => console.error('Erro ao conectar:', err));

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);

