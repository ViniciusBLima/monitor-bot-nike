const request = require('request');
const readline = require('readline');
const that = this;
const discord = require('discord.js');
const discordInfo = require('../discord-info.json');

const configs = require("../configs/config.json");
const cookie = configs.cookie;

var captcha = '';
var respostaSms = '';
var celular = ''

that.GerarSms = function () {
    const pegarDadosSku = require ('./pegarDadosSku');
    const dadosUsuario = require('./pegarDadosUsuario');
    celular = dadosUsuario.celular


    let options = {
        url: 'https://www.nike.com.br/auth/two-factor/generate',
        method: 'POST',
        headers: {
            'authority': 'www.nike.com.br',
            'x-sec-clge-req-type': 'ajax',
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'x-requested-with': 'XMLHttpRequest',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36',
            'sec-ch-ua': '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
            'origin': 'https://www.nike.com.br',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://www.nike.com.br/' + pegarDadosSku.urlSku,
            'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': cookie
        },
        body: "CelularCliente=" + celular + "&ProdutoId=" + pegarDadosSku.idProduto
    }
    function GerarSmsCallback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("SMS Enviado com sucesso!");
            
            
            const client = new discord.Client();
            const webhookClient = new discord.WebhookClient(discordInfo.hookId, discordInfo.hookToken);
            webhookClient.send("COMPRA DE TENIS EM ANDAMENTO, INSIRA O SMS QUE RECEBEU NO BOT <@243176987584102400>");

            //----------------FAZ UM INTERFACE DE INPUT PARA LER OQUE O USUARIO DIGITA---------------------------

            var leitor = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            leitor.question("Insira o codigo que recebeu via sms: ", function (answer) {
                respostaSms = answer;
                console.log("Codigo salvo com sucesso! " + respostaSms);
                leitor.close();
                ChecarCodigo()
            });
            //--------------------------------------------------------------------------------------------------

            function ChecarCodigo() {
                let options = {
                    url: 'https://www.nike.com.br/auth/two-factor/validate',
                    method: 'POST',
                    headers: {
                        'authority': 'www.nike.com.br',
                        'x-sec-clge-req-type': 'ajax',
                        'accept': 'application/json, text/javascript, */*; q=0.01',
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'x-requested-with': 'XMLHttpRequest',
                        'sec-ch-ua-mobile': '?0',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36',
                        'sec-ch-ua': '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
                        'origin': 'https://www.nike.com.br',
                        'sec-fetch-site': 'same-origin',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-dest': 'empty',
                        'referer': 'https://www.nike.com.br/' + pegarDadosSku.urlSku,
                        'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
                        'cookie': cookie
                    },
                    body: "NumberCode=" + respostaSms + "&ProdutoId=" + pegarDadosSku.idProduto
                }
                function ChecarSmsCallback(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log("SMS ENVIADO COM SUCESSO!");
                        //captcha = gerarCaptcha.GerarCaptcha().then(() => {
                            console.log(captcha)
                            const AdicionarAoCarrinho = require('./adicionarCarrinho');;
                            AdicionarAoCarrinho.AdicionarCarrinho();
                        //});
                    }
                    else {
                        console.log("OCORREU UM ERRO AO ENVIAR O SMS");
                        console.log(body)
                    }
                }
                request(options, ChecarSmsCallback);
            }
        }
        else if (body.includes('��/���8�bV�')) {
            console.log("O TENIS NÃO POSSUI SMS");
            const AdicionarAoCarrinho = require('./adicionarCarrinho');;
            AdicionarAoCarrinho.AdicionarCarrinho();
        }
        else {
            console.log("Ocorreu um erro ao enviar o sms");
        }
    }
    request(options, GerarSmsCallback);
};