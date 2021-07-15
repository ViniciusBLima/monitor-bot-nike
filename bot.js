//const prepararCaptcha = require('./apis/prepararCaptcha');

var that = this;
console.log("INICIANDO O BOT");


that.Ligar = async function () {
    
    //await prepararCaptcha.GerarChave(); //PRIMEIRO ABRE O SITE DA NIKE PARA PODER PEGAR O CAPTCHA

    const pegarDadosSku = require ('./apis/pegarDadosSku');
    const pegarDadosUsuario = require('./apis/pegarDadosUsuario');

    await pegarDadosSku.PegarDadosSku(); //PEGA INFORMAÇÕES SOBRE O TENIS
    await pegarDadosUsuario.PegarDadosUser(); //PEGA INFORMAÇÕES DO USUARIO

}