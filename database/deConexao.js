const mysql = require('mysql');

const conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_galeria',
});

module.exports = conexao;
