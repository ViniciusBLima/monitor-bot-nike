var start = new Date()
var hrstart = process.hrtime()
var simulateTime = 5
var a = false;

const api = require('./api.js');
const discord = require('discord.js');
const discordInfo = require('./discord-info.json');

//-------------------------------------------------------------
//-------------------------------------------------------------
//--------------CONECTA NO DISCORD-----------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------
const client = new discord.Client();
const webhookClient = new discord.WebhookClient(discordInfo.hookId, discordInfo.hookToken);
webhookClient.send("ninguém mais suporta o victor e o pedro")

function callBack(error,response) {
  if (!error && response.statusCode == 200) {
  var retorno = JSON.parse(response)[0];

  if (retorno.status == "AVAILABLE") {
    var quantidadeSkus = retorno.skus.length

    for (let i = 0; i < quantidadeSkus; i++) {
      let sku = retorno.skus[i];

      if (sku.status == "AVAILABLE") {        
        let tenis = {
          nome: sku.name,
          tamanho: sku.specs.size,
          preco: sku.price,
          imagem: sku.images.default.substr(2)
        }

        webhookClient.send({
          embeds: [{
            color: 'FF0000',
            thumbnail: {
              'url': "https://" + tenis.imagem
            },
            title: ':flame: ITEM ' + tenis.nome + ' DISPONIVEL :flame:',
            fields: [
              {
                name: 'Item:',
                value: tenis.nome,
              },
              {
                name: 'Tamanho:',
                value: tenis.tamanho
              },
              {
                name: 'Preço:',
                value: tenis.preco
              }
            ]

          }]
        });
      };
    };
  };
}
else{
  console.log(response);
}
};


setInterval(function () {
  api.sendRequest(callBack);
}, 1000);


