const request = require('request');
const adicionarCarrinho = require('./adicionarCarrinho');

const configs = require("../configs/config.json");
const cookie = configs.cookie;
var that = this;

that.GerarEndereco = async function(){
    let options = {
        url: 'https://www.nike.com.br/minha-conta/meus-enderecos',
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
            'origin': 'https://www.nike.com.br',
            'referer': 'https://www.nike.com.br/minha-conta/meus-enderecos',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': cookie
        }
    };

    function Endereco(error, response, body) {
        if (!error && response.statusCode == 200) {
            that.enderecoId = body.split('enderecoid=')[1].substr(1,7);
            adicionarCarrinho.AdicionarCarrinho();
        }
        else{
            console.log(body);
        }
    }
    request(options, Endereco);
}