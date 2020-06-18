const express = require('express');
const router = express.Router();

const GaleriaModel = require('../model/galeria/GaleriaModel');
const RespostaClass = require('../model/RespostaClass');

const fs = require('fs');
const pastaPublica = './public/imagens/';

router.get('/', (req, res, next) => {
    GaleriaModel.getTodos((error, retorno) => {
        let resposta = new RespostaClass();
        if (error) {
            resposta.erro = true;
            resposta.msg = 'Ocorreu um error';
        } else {
            resposta.dados = retorno;
        }
        res.json({ resposta, error });
    });
});

router.get('/:id?', (req, res, next) => {
    GaleriaModel.getID(req.params.id, (error, retorno) => {
        let resposta = new RespostaClass();
        if (error) {
            resposta.erro = true;
            resposta.msg = 'Ocorreu um error';
        } else {
            resposta.dados = retorno;
        }
        res.json({ resposta, error });
    });
});

router.post('/', (req, res, next) => {
    let resposta = new RespostaClass();

    if (req.body.dados_imagem) {
        const bitmap = new Buffer.from(req.body.dados_imagem.imagem_base64, 'base64');
        const dataAtual = new Date()
            .toLocaleString()
            .replace(/\//g, '')
            .replace(/-/g, '')
            .replace(/:/g, '')
            .replace(/ /g, '');
        const nomeImageCaminho = pastaPublica + dataAtual + req.body.dados_imagem.nomde_arquivo;
        fs.writeFileSync(nomeImageCaminho, bitmap);
        req.body.caminho = nomeImageCaminho;

        GaleriaModel.adicionar(req.body, (error, retorno) => {
            if (error) {
                resposta.erro = true;
                resposta.msg = 'Ocorreu um error';
            } else {
                if (retorno.affectedRows > 0) {
                    resposta.msg = 'cadastrado com sucesso';
                    resposta.dados = retorno;
                    res.json({ resposta, error });
                } else {
                    resposta.erro = true;
                    resposta.msg = 'Não foi possível realizar a operação';
                    console.error('Erro:', resposta.msg);
                    res.json({ resposta });
                }
            }
        });
    } else {
        resposta.erro = true;
        resposta.msg = 'padrão incorreto';
        console.error('Erro:', resposta.msg);
        res.json({ resposta });
    }
});

router.put('/', (req, res, next) => {
    let resposta = new RespostaClass();

    if (req.body.dados_imagem) {
        const bitmap = new Buffer.from(req.body.dados_imagem.imagem_base64, 'base64');
        const dataAtual = new Date()
            .toLocaleString()
            .replace(/\//g, '')
            .replace(/-/g, '')
            .replace(/:/g, '')
            .replace(/ /g, '');
        const nomeImageCaminho = pastaPublica + dataAtual + req.body.dados_imagem.nomde_arquivo;
        fs.writeFileSync(nomeImageCaminho, bitmap);
        req.body.caminho = nomeImageCaminho;
    }
    GaleriaModel.editar(req.body, (error, retorno) => {
        if (error) {
            resposta.erro = true;
            resposta.msg = 'Ocorreu um error';
        } else {
            if (retorno.affectedRows > 0) {
                resposta.msg = 'alterado com sucess';
                resposta.dados = retorno;
                res.json({ resposta, error });
            } else {
                resposta.erro = true;
                resposta.msg = 'Não foi possível realizar a operação';
                console.error('Erro:', resposta.msg);
                res.json({ resposta });
            }
        }
    });
});

router.delete('/:id?', (req, res, next) => {
    GaleriaModel.deletar(req.params.id, (error, retorno) => {
        let resposta = new RespostaClass();
        if (error) {
            resposta.erro = true;
            resposta.msg = 'Ocorreu um error';
        } else {
            if (retorno.affectedRows > 0) {
                resposta.msg = 'excluido com sucesso';
                resposta.dados = retorno;
                res.json({ resposta, error });
            } else {
                resposta.erro = true;
                resposta.msg = 'Não foi possível realizar a operação';
                console.error('Erro:', resposta.msg);
                res.json({ resposta });
            }
        }
    });
});

module.exports = router;
