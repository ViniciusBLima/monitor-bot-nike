const ipLocal = require('ip');
const api = require('./api.js');
const discord = require('discord.js');
const discordInfo = require('./discord-info.json');
const bot = require('./bot.js');
const config = require('./configs/url.json');

var ip = ipLocal.address()
var tamanho = config.tamanho


//-------------------------------------------------------------
//-------------------------------------------------------------
//--------------CONECTA NO DISCORD-----------------------------
//-------------------------------------------------------------
//-------------------------------------------------------------

const client = new discord.Client();
const webhookClient = new discord.WebhookClient(discordInfo.hookId, discordInfo.hookToken);

webhookClient.send("BOT CONECTADO NO USUARIO: <@243176987584102400>, IP: " + ip);

//function que monitora o tenis


async function callBack(response) {
  var retorno = JSON.parse(response)[0];
  if (retorno.status) {
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
          if (tenis.tamanho == tamanho) {
            console.log("Tenis "+tenis.nome+ "em estoque, tentando fazer a compra...")
          }

        };
      };
    }
    else {
      console.log(response);
    }
    //
  };
}


setInterval(function () {
  api.sendRequest(callBack);
}, 10000);

function webhook() {
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
}
