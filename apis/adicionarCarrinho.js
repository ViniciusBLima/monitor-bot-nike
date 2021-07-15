const request = require('request');
const configs = require("../configs/config.json");
const cookie = configs.cookie;
var that = this;

var urlSku = '';
var idSku = '';
var captcha = '';

that.AdicionarCarrinho = async function() {
    const finalizarCompra = require('./finalizarCompra');
    const gerarSms = require('./gerarSms');
    const pegarDadosSku = require ('./pegarDadosSku');

    //await GerarCaptcha();
    let options = {
        url: 'https://www.nike.com.br/Carrinho/Adicionar',
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
            'referer': 'https://www.nike.com.br' + pegarDadosSku.urlSku,
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': cookie
        },
        body: "EPrincipal=" + pegarDadosSku.idSku + "&EAcessorio%5B%5D=&ECompreJunto%5B%5D=&AdicaoProdutoId=&Origem=&SiteId=106&g-recaptcha-response="// + captcha
    };
    function CarrinhoResposta(error, response, body) {
        if (!error && response.statusCode == 200) {
            let retorno = JSON.parse(body);
            if (retorno.success == true) {
                adicionouCarrinho = true
                console.log("Produto adicionado no carrinho com sucesso!");
                finalizarCompra.FinalizarCompra();
            }
            else if (retorno.success == false && retorno.twoFactorAuth == true) {
                console.log("PRECISA DE SMS!")
                gerarSms.GerarSms();
            }
            else if(retorno.Mensagem.includes("limitada a 1 unidade")){
                console.log("PRODUTO JÁ FOI ADICIONADO AO CARRINHO!");
                finalizarCompra.FinalizarCompra();
            }
        }
        else {
            console.log(body);
        }
    }
    request(options, CarrinhoResposta)
}