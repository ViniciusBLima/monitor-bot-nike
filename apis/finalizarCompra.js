const request = require('request');
const configs = require("../configs/config.json");
const cartaoCredito = require('../configs/cartao_de_credito.json')
const cookie = configs.cookie;
var that = this;

const numeroCartao = cartaoCredito.numero_cartao;
const nomeCartao = cartaoCredito.nome_dono_cartao;
const cpfDonoCartao = cartaoCredito.cpf_dono_cartao;
const expiracao = cartaoCredito.data_expira_cartao;
const cvv = cartaoCredito.codigo_seguranca;
const parcelas = cartaoCredito.parcelas;

that.FinalizarCompra = async function(){
    const dadosUsuario = require('./pegarDadosUsuario');
    const gerarEndereco = require('./gerarEndereco');
    let options = {
        url: 'https://www.nike.com.br/Pagamento/gravarPedido',
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
            'referer': 'https://www.nike.com.br/Checkout',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': cookie

            },
        body: "MeioPagamentoId=1&ClearsaleFingerprint="+ dadosUsuario.uuid1 +"&TipoVale=&SalvarCartao=0&CartaoCreditoId=&UltimosDigitos=&EnderecoId="+ gerarEndereco.enderecoId +"&Utm%5BUtmSource%5D=ValidarBuscaOrganica&Utm%5BUtmMedium%5D=&Utm%5BUtmTerm%5D=&Utm%5BUtmCp%5D=&Utm%5BUtmContent%5D=&Utm%5BUtmCampaign%5D=&Bandeira=1&Bandeira_2=&Nome="+ nomeCartao +"&Nome_2=&NumCartao1="+ numeroCartao +"&NumCartao1_2=&ValidadeMesAno="+ expiracao +"%2F&ValidadeMesAno2=null%2Fnull&CodSeguranca="+ cvv +"&CodSeguranca_2=&Parcelamento="+ parcelas +"&Parcelamento_2=&DocumentoPortador="+ cpfDonoCartao +"&DocumentoPortador2=&DoisCartoes=0&ValorCartao_1=&ValorCartao_2=&ShippingType=Expressa"
    };

    function Comprar(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
        else{
            console.log(body);
        }
    }
    request(options, Comprar);
}