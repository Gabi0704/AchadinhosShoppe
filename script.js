const produtos = [
  {
    titulo: 'Meia-calça Térmica',
    descricao:
      'Meia-Calça Térmica Forrada Peluciada Translúcida De Lã Quente Feminina Para Inverno',
    preco: 'R$29,99 - R$83,99',
    imagens: ['imagens/meiacalca.png'],
    videos: ['videos/meiacalca.mp4'],
    link: 'https://s.shopee.com.br/8KeArZVO6l?share_channel_code=3',
  },
  {
    titulo: 'Película Protetora Para Carro',
    descricao:
      "Película à prova d'água que mantém seu retrovisor limpo, nítido e seguro na chuva.",
    preco: 'R$ 13,39',
    imagens: ['imagens/retrovisor.png'],
    videos: [],
    link: 'https://s.shopee.com.br/1VnqjEY4x7?share_channel_code=3',
  },
  {
    titulo: 'Garrafa Térmica Lilo e Stitch',
    descricao:
      'Garrafa Térmica Lilo e Stitch 420ml Água Café Chá Medidor de Temperatura',
    preco: 'R$ 46,74',
    imagens: ['imagens/stitch.png','imagens/stitch1.png','imagens/stitch2.png','imagens/stitch3.png','imagens/stitch4.png','imagens/stitch5.png','imagens/stitch6.png','imagens/stitch7.png','imagens/stitch8.png']
    videos: ['videos/stitch video.mp4'],
    link: 'https://s.shopee.com.br/8KeArZVO6l?share_channel_code=3',
  },
  {
    titulo: 'Panelas antiaderentes que não grudam',
    descricao:
      'Jogo De Panelas Antiaderente 9 Peças Kit Conjunto Teflon Tampa de Vidro Várias Cores Durável Moderna',
    preco: 'R$ 184,90',
    imagens: ['imagens/panelas.png'],
    videos: [],
    link: 'https://s.shopee.com.br/2fzo5SXmLV',
  },
];

function montarCatalogo() {
  const container = $('#catalogo');
  produtos.forEach((produto, index) => {
    container.append(`
      <div class="produto" data-id="${index}">
        <img src="${produto.imagens[0]}" alt="${produto.titulo}" />
        <h3>${produto.titulo}</h3>
        <p>${produto.descricao}</p>
        <p><strong>${produto.preco}</strong></p>
      </div>
    `);
  });
}

function abrirModal(id) {
  const p = produtos[id];
  $('#modal-title').text(p.titulo);
  $('#modal-desc').text(p.descricao);
  $('#modal-price').text(p.preco);
  $('#modal-link').off('click').on('click', () => {
    window.open(p.link, '_blank');
  });

  const carrossel = $('.carrossel');

  // Remove slick se já estiver inicializado
  if (carrossel.hasClass('slick-initialized')) {
    carrossel.slick('unslick');
  }

  // Limpa o conteúdo do carrossel
  carrossel.html('');

  // Adiciona imagens
  p.imagens.forEach((src) => {
    carrossel.append(
      `<div><img src="${src}" alt="${p.titulo}" /></div>`
    );
  });

  // Adiciona vídeos
  p.videos.forEach((src) => {
    carrossel.append(
      `<div><video controls><source src="${src}" type="video/mp4" /></video></div>`
    );
  });

  // Inicializa o carrossel
  carrossel.slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
  });

  $('#modal').fadeIn();
}

$(document).ready(function () {
  montarCatalogo();

  $(document).on('click', '.produto', function () {
    abrirModal($(this).data('id'));
  });

  $('.close').click(() => $('#modal').fadeOut());

  $(window).click((e) => {
    if ($(e.target).is('#modal')) {
      $('#modal').fadeOut();
    }
  });
});
