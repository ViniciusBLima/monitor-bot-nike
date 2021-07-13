var request = require('request');
const urls = require('./url.json');
var that = this;
const cookie = urls.cookie;
var quantidadeUrl = urls.sku.length;
that.j = 0

    that.handleCallback = {};
    
    var options = {
        url: 'https://www.nike.com.br/ProductLookup/'+urls.sku[0],
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

    that.handleResponse = function (error, response, body) {
        that.handleCallback(body);
        console.log(response.headers);
    }
    that.sendRequest = function (handleCallback) {
        that.handleCallback = handleCallback;
        
        options.url = 'https://www.nike.com.br/ProductLookup/'+urls.sku[that.j]
        that.url = options.url
        that.j++
        if(that.j >= quantidadeUrl){
            that.j = 0
        }
        request(options, that.handleResponse);

    }

return that;