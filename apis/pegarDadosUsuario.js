const request = require('request');
const configs = require("../configs/config.json");
const GerarEndereco = require('./gerarEndereco');
const cookie = configs.cookie;
var that = this;

that.PegarDadosUser = function () {
    var options = {
        url: 'https://www.nike.com.br/minha-conta/alterar-dados-cadastrais',
        method: 'POST',
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
            'origin': 'https://www.nike.com.br',
            'referer': 'https://www.nike.com.br/minha-conta',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': cookie
        }
    };

    function BuscarDados(error, response, body) {
        if (!error && response.statusCode == 200) {
            var retorno = body

            try {

                //---------------------------------
                // PEGA DADOS NO SITE DA NIKE
                //---------------------------------

                that.cep = retorno.split("Cep")[6].substr(9, 8);

                that.celular = retorno.split("FoneContato1")[6].substr(9, 11);

                that.uuid = retorno.split("uuid',")[1].substr(2,36);

                console.log("DADOS PEGOS COM SUCESSO!");
                GerarEndereco.GerarEndereco();
            }
            catch (err) {
                console.log("OCORREU UM ERRO COM SEUS COOKIES.");
            }

        }
        else {
            console.log("Ocorreu um problema na execução dos dados: " + body)
        }
    }
    request(options, BuscarDados);
};