const puppeteer = require('puppeteer');
var that = this;

that.GerarCaptcha = async function () {
    console.log("Buscando chaves captcha...");
    const prepararCaptcha = require('./prepararCaptcha');
    var antes = Date.now();
    let = pageCaptcha = prepararCaptcha.pageCaptcha

    that.captcha = await prepararCaptcha.pageCaptcha.evaluate('window.grecaptcha.execute(RECAPTCHA_V3_SITE_KEY, {            action: "add_to_cart"        }).then(function(token) {            document.querySelector("body").id = token;            return(token)        })');
    console.log(that.captcha)

    var duracao = Date.now() - antes;
    console.log("Captcha caputado com sucesso " + duracao + "ms");
}