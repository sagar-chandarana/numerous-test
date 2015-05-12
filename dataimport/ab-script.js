appbase = require('appbasejs');
//appbase.credentials('meliuzmock','85acf56fc7b30e24078ffd4163d64e2a');
async = require('async');

partners = [require('./me_reembolso.json')];

var opsToPerform = [];

var store = function (namespace, data) {
  opsToPerform.push(function (callback) {
    appbase.ns(namespace).v(appbase.uuid()).setData(data, callback);
  });
}

var batch = function (namespace, array) {
  array.forEach(store.bind(null, namespace));
}


//partners.forEach(batch.bind(null, 'partner_new_data'));
[[{ "cashback" : 721.75,
    "clicks" : 130,
    "description" : "",
    "id" : 272,
    "is_commissioned" : 1,
    "ref" : "beleza-na-web",
    "site" : "belezanaweb.com.br",
    "text" : " <h3>Sobre a empresa Beleza na Web</h3> A loja Beleza na Web fundada no ano de 2010, Ã© o ponto de encontro na internet de quem Ã© apaixonado por beleza. Uma empresa baseada em produtos totalmente voltados para beleza, sendo uma rede que conecta mulheres, marcas, formadores de opniÃ£o e os melhores profissionais do mercado. <br /> <br /> Saiba as vÃ¡rias categorias de produtos vendidos na loja virtual: <br /> <br /> <ul> <li>Produtos para cabelos</li> <li>Perfumes</li> <li>Cuidados para pele</li> <li>Corpo e Banho</li> <li>Maquiagem</li> <li>Unhas</li> <li>AcessÃ³rios</li> <li>Presentes</li> </ul> <h3>Frete GrÃ¡tis da loja Beleza na Web</h3> A Beleza na Web tem Frete GrÃ¡tis para compras acima de um determinado valor e os produtos com valor menor que o necessÃ¡rio, tem frete fixo. O Meliuz Ã© uma boa dica de site para ficar de olho em ofertas de Frete GrÃ¡tis Beleza na Web e gastar menos. <br /><br /> <h3>Entre em contato com a Beleza na Web</h3> Se vocÃª comprou na loja virtual Beleza na Web e deseja tirar alguma dÃºvida ou necessita de informaÃ§Ãµes, ligue de segunda a sexta das 8h Ã s 20h e aos sÃ¡bados das 8h Ã s 14h no telefone: (11) 3716-1662.",
    "titulo" : "Beleza na Web",
    "total_sale" : 14713.559999999999
}]].forEach(batch.bind(null, 'partner_new_data'));

async.parallelLimit(opsToPerform, 100, function (err) {
  console.log(err);
});