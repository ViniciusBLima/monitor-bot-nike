const puppeteer = require('puppeteer');
var that = this;

that.GerarChave = async function () {
    const browser = await puppeteer.launch({ headless: true });
    var page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36");
    await page.setViewport({ 'width': 1366, 'height': 768 }); await page.goto("https://www.nike.com.br/dunk-high-x-fragment-design-67-80-445-331128");
    that.pageCaptcha = page

    that.cookieProvisorio = await that.pageCaptcha.evaluate('document.cookie');
    console.log("BOT INICIADO COM SUCESSO!");

};

