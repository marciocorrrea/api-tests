const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = express();
const porta = 3000;

const galeriaRouter = require('./routers/galeriaRouter');

api.use(cors());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json({ limit: '20mb', extended: true }));
api.use('/public', express.static('public'));
api.use('/galeria', galeriaRouter);

api.get('/', (req, res) => {
    res.send('Cheguemos');
});

api.listen(porta);
