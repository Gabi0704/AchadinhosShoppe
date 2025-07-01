const produtos = [
  {
    titulo: 'Meia-calça Térmica',
    descricaoCurta: 'Meia-Calça Térmica Feminina para Inverno, forrada e peluciada.',
    descricao: `Meia-Calça Térmica Forrada Peluciada Translúcida De Lã Quente Feminina Para Inverno. Perfeita para manter o estilo mesmo nos dias mais frios!`,
    preco: 'R$29,99 - R$83,99',
    imagens: ['imagens/meiacalca.png'],
    videos: [],
    link: 'https://s.shopee.com.br/8KeArZVO6l?share_channel_code=3',
  },
  {
    titulo: 'Película Protetora Para Carro',
    descricaoCurta: 'Película antiembaçante para retrovisor, segurança em dias de chuva.',
    descricao: `Película à prova d'água que mantém seu retrovisor limpo, nítido e seguro na chuva. Fácil de aplicar e compatível com a maioria dos modelos de veículos.`,
    preco: 'R$ 13,39',
    imagens: ['imagens/retrovisor.png'],
    videos: [],
    link: 'https://s.shopee.com.br/1VnqjEY4x7?share_channel_code=3',
  },
  {
    titulo: 'Garrafa Térmica Lilo e Stitch',
    descricaoCurta: 'Garrafa com termômetro digital, inox, portátil e super fofa.',
    descricao: `✨Garrafa Térmica com dupla parede de isolamento capaz de manter sua bebida gelada por até 4 horas ou quente por até 2 horas. Possui visor de Led na tampa para indicar a temperatura da bebida dentro da garrafa.
✨Produto feito em Aço Inox
✨Livre de BPA
✨Garrafa com parede dupla e isolamento a vácuo.
Tampa com parede dupla.
✨Portátil e não vaza.
❤️Material:
✨Aço inox
✔️Com termômetro digital
✔️Por favor enviar o nome a ser colocado assim que finalizar a compra, caso contrário seguirá sem o mesmo. Agradecemos a compreensão.`,
    preco: 'R$ 46,74',
    imagens: ['imagens/stitch.png','imagens/stitch1.png','imagens/stitch2.png','imagens/stitch3.png','imagens/stitch4.png','imagens/stitch5.png','imagens/stitch6.png','imagens/stitch7.png','imagens/stitch8.png'],
    videos: ['videos/stitch video.mp4'],
    link: 'https://s.shopee.com.br/8KeArZVO6l?share_channel_code=3',
  },
  {
    titulo: 'Panelas antiaderentes que não grudam',
    descricaoCurta: 'Conjunto de panelas antiaderente com tampa de vidro. Durabilidade e estilo.',
    descricao: `Jogo De Panelas Antiaderente 9 Peças Kit Conjunto Teflon Tampa de Vidro Várias Cores. Durável, moderno e ideal para sua cozinha.`,
    preco: 'R$ 184,90',
    imagens: ['imagens/panelas.png'],
    videos: [],
    link: 'https://s.shopee.com.br/2fzo5SXmLV',
  },
];

// Monta os cards de produtos
function montarCatalogo() {
  const container = $('#catalogo');
  container.empty();

  produtos.forEach((produto, index) => {
    container.append(`
      <div class="produto" data-id="${index}">
        <img src="${produto.imagens[0]}" alt="${produto.titulo}" />
        <h3>${produto.titulo}</h3>
        <p>${produto.descricaoCurta}</p>
        <p><strong>${produto.preco}</strong></p>
      </div>
    `);
  });
}

// Abre o modal com os dados do produto
function abrirModal(id) {
  const p = produtos[id];
  $('#modal-title').text(p.titulo);
  $('#modal-desc').text(p.descricao);
  $('#modal-price').text(p.preco);
  $('#modal-link').off('click').on('click', () => window.open(p.link, '_blank'));

  const carrossel = $('.carrossel');

  // Remove carrossel anterior, se houver
  if (carrossel.hasClass('slick-initialized')) {
    carrossel.slick('unslick');
  }
  carrossel.html('');

  // Adiciona imagens e vídeos
  p.imagens.forEach(src => {
    carrossel.append(`<div><img src="${src}" alt="${p.titulo}" /></div>`);
  });
  p.videos.forEach(src => {
    carrossel.append(`<div><video controls preload="metadata"><source src="${src}" type="video/mp4" /></video></div>`);
  });

  // Inicia slick
  carrossel.slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
  });

  $('#modal').fadeIn();
}

$(document).ready(() => {
  montarCatalogo();

  // Clique em um card para abrir o modal
  $(document).on('click', '.produto', function () {
    abrirModal($(this).data('id'));
  });

  // Fecha o modal
  $('.close').click(() => $('#modal').fadeOut());

  // Clica fora do conteúdo para fechar
  $(window).click(e => {
    if ($(e.target).is('#modal')) {
      $('#modal').fadeOut();
    }
  });
});
