const db = require('../../database/deConexao');

module.exports = class GaleriaModel {
    static getTodos(callback) {
        return db.query('SELECT * FROM db_galeria.galeria', callback);
    }
    static getID(id, callback) {
        return db.query('SELECT * FROM db_galeria.galeria where id_galeria = ?', [id], callback);
    }
    static adicionar(dados, callback) {
        return db.query(
            'insert into db_galeria.galeria (titulo, caminho) values (?, ?)',
            [dados.titulo, dados.caminho],
            callback
        );
    }
    static editar(dados, callback) {
        return db.query(
            'UPDATE db_galeria.galeria  SET titulo = ?, caminho = ? where id_galeria = ?',
            [dados.titulo, dados.caminho, dados.id_galeria],
            callback
        );
    }
    static deletar(id, callback) {
        return db.query('DELETE FROM db_galeria.galeria where id_galeria = ?', [id], callback);
    }
};
