var CHAVE_FAVORITOS_PROJETOS = 'ponteSolidaria.projetosFavoritos';

var projetosAtivos = [
  {
    id: 'mesa-cheia',
    titulo: 'Mesa Cheia',
    area: 'Segurança alimentar',
    descricao: 'Distribuição semanal de cestas básicas e refeições prontas para famílias cadastradas em situação de insegurança alimentar, em parceria com mercados locais.'
  },
  {
    id: 'reforco-que-transforma',
    titulo: 'Reforço que Transforma',
    area: 'Educação',
    descricao: 'Aulas de reforço em português e matemática para crianças do ensino fundamental, aos sábados, ministradas por voluntários e estudantes universitários.'
  },
  {
    id: 'primeiro-passo',
    titulo: 'Primeiro Passo',
    area: 'Capacitação profissional',
    descricao: 'Oficinas de currículo, entrevista de emprego e noções básicas de informática para jovens de 16 a 24 anos em busca da primeira oportunidade de trabalho.'
  },
  {
    id: 'agasalho-em-rede',
    titulo: 'Agasalho em Rede',
    area: 'Campanha sazonal',
    descricao: 'Coleta e distribuição de roupas de frio durante o inverno, com pontos de arrecadação espalhados por 12 bairros da cidade.'
  }
];

function escaparHTML(valor) {
  var caracteres = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  return String(valor).replace(/[&<>"']/g, function (caractere) {
    return caracteres[caractere];
  });
}

function normalizarTexto(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
}

function lerFavoritosProjetos() {
  try {
    var favoritos = JSON.parse(localStorage.getItem(CHAVE_FAVORITOS_PROJETOS) || '[]');
    return Array.isArray(favoritos) ? favoritos.filter(function (id) {
      return typeof id === 'string';
    }) : [];
  } catch (erro) {
    return [];
  }
}

function gravarFavoritosProjetos(favoritos) {
  try {
    localStorage.setItem(CHAVE_FAVORITOS_PROJETOS, JSON.stringify(favoritos));
    return true;
  } catch (erro) {
    return false;
  }
}

window.renderizarProjetos = function (raiz) {
  var lista = raiz.querySelector('.projetos');
  if (!lista) return;

  var busca = raiz.querySelector('#busca-projetos');
  var filtroArea = raiz.querySelector('#area-projetos');
  var somenteFavoritos = raiz.querySelector('#somente-favoritos');
  var termo = normalizarTexto(busca ? busca.value.trim() : '');
  var areaSelecionada = filtroArea ? filtroArea.value : '';
  var favoritos = lerFavoritosProjetos();
  var projetosFiltrados = projetosAtivos.filter(function (projeto) {
    var textoProjeto = normalizarTexto([projeto.titulo, projeto.area, projeto.descricao].join(' '));
    return textoProjeto.includes(termo) && (!areaSelecionada || projeto.area === areaSelecionada) &&
      (!somenteFavoritos || !somenteFavoritos.checked || favoritos.includes(projeto.id));
  });
  var resultado = raiz.querySelector('#resultado-projetos');

  if (resultado) {
    resultado.textContent = projetosFiltrados.length + (projetosFiltrados.length === 1 ? ' projeto encontrado' : ' projetos encontrados');
  }

  if (projetosFiltrados.length === 0) {
    var mensagemVazia = somenteFavoritos && somenteFavoritos.checked
      ? 'Você ainda não salvou projetos favoritos.'
      : 'Nenhum projeto corresponde à busca.';
    lista.innerHTML = '<p class="projetos__vazio">' + mensagemVazia + '</p>';
    return;
  }

  lista.innerHTML = projetosFiltrados.map(function (projeto) {
    var ehFavorito = favoritos.includes(projeto.id);
    return `
      <article class="cartao-projeto">
        <h2>${escaparHTML(projeto.titulo)}</h2>
        <p class="cartao-projeto__tag">${escaparHTML(projeto.area)}</p>
        <p>${escaparHTML(projeto.descricao)}</p>
        <button type="button" class="botao-favorito" data-favorito="${escaparHTML(projeto.id)}" aria-pressed="${ehFavorito}">${ehFavorito ? 'Remover favorito' : 'Salvar favorito'}</button>
      </article>
    `;
  }).join('');
};

window.inicializarFiltrosProjetos = function (raiz) {
  var busca = raiz.querySelector('#busca-projetos');
  var filtroArea = raiz.querySelector('#area-projetos');
  var somenteFavoritos = raiz.querySelector('#somente-favoritos');
  var lista = raiz.querySelector('.projetos');
  var mensagemFavoritos = raiz.querySelector('#mensagem-favoritos');
  if (!busca || !filtroArea || !somenteFavoritos || !lista) return;

  busca.addEventListener('input', function () {
    window.renderizarProjetos(raiz);
  });
  filtroArea.addEventListener('change', function () {
    window.renderizarProjetos(raiz);
  });
  somenteFavoritos.addEventListener('change', function () {
    window.renderizarProjetos(raiz);
  });
  lista.addEventListener('click', function (evento) {
    var botao = evento.target.closest('button[data-favorito]');
    if (!botao) return;

    var id = botao.getAttribute('data-favorito');
    var favoritos = lerFavoritosProjetos();
    var removendo = favoritos.includes(id);
    var atualizados = removendo
      ? favoritos.filter(function (favorito) { return favorito !== id; })
      : favoritos.concat(id);

    if (!gravarFavoritosProjetos(atualizados)) {
      if (mensagemFavoritos) mensagemFavoritos.textContent = 'Não foi possível salvar favoritos neste navegador.';
      return;
    }

    if (mensagemFavoritos) {
      mensagemFavoritos.textContent = removendo ? 'Projeto removido dos favoritos.' : 'Projeto salvo nos favoritos.';
    }

    if (somenteFavoritos.checked) {
      window.renderizarProjetos(raiz);
      somenteFavoritos.focus();
    } else {
      botao.setAttribute('aria-pressed', String(!removendo));
      botao.textContent = removendo ? 'Salvar favorito' : 'Remover favorito';
    }
  });
};
