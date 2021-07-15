const request = require('request');
const configs = require("../configs/config.json");
const prepararCaptcha = require('./prepararCaptcha');
const cookie = prepararCaptcha.cookieProvisorio;
const sku = configs.sku;
const tamanho = configs.tamanho;
var that = this;

that.PegarDadosSku = function () {
    var options = {
        url: 'https://www.nike.com.br/ProductLookup/' + sku,
        method: 'GET',
        headers: {
            'authority': 'www.nike.com.br',
            'sec-ch-ua': '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
            'accept': '*/*',
            'x-requested-with': 'XMLHttpRequest',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://www.nike.com.br/tenis-nike-air-max-verona-feminino-1-16-213-303461?gridPosition=A2',
            'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': cookie
        }
    };


    function DadosSku(error, response, body) {
        if (!error && response.statusCode == 200) {
            let retorno = JSON.parse(body);
            let tamanhoRetorno = retorno[0].skus.length;
            for (var i = 0; i < tamanhoRetorno; i++) {
                if (retorno[0].skus[i].specs.size == tamanho) {
                    that.idSku = retorno[0].skus[i].sku
                    that.idProduto = retorno[0].skus[i].url.split('-');
                    let logicaUrl = that.idProduto.length - 1;
                    that.idProduto = that.idProduto[logicaUrl];
                    that.urlSku = retorno[0].skus[i].url
                    console.log("INFORMAÇÕES SOBRE O TENIS OBTIDAS COM SUCESSO!");
                    break;
                }
                
            }
        }
        else {
            console.log("OCORREU UM ERRO AO OBTER AS INFORMAÇÕES SOBRE O TENIS: " + body)
        }
    }

    request(options, DadosSku);
};