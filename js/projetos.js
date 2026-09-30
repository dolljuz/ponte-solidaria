var projetosAtivos = [
  {
    titulo: 'Mesa Cheia',
    area: 'Segurança alimentar',
    descricao: 'Distribuição semanal de cestas básicas e refeições prontas para famílias cadastradas em situação de insegurança alimentar, em parceria com mercados locais.'
  },
  {
    titulo: 'Reforço que Transforma',
    area: 'Educação',
    descricao: 'Aulas de reforço em português e matemática para crianças do ensino fundamental, aos sábados, ministradas por voluntários e estudantes universitários.'
  },
  {
    titulo: 'Primeiro Passo',
    area: 'Capacitação profissional',
    descricao: 'Oficinas de currículo, entrevista de emprego e noções básicas de informática para jovens de 16 a 24 anos em busca da primeira oportunidade de trabalho.'
  },
  {
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

window.renderizarProjetos = function (raiz) {
  var lista = raiz.querySelector('.projetos');
  if (!lista) return;

  var busca = raiz.querySelector('#busca-projetos');
  var filtroArea = raiz.querySelector('#area-projetos');
  var termo = normalizarTexto(busca ? busca.value.trim() : '');
  var areaSelecionada = filtroArea ? filtroArea.value : '';
  var projetosFiltrados = projetosAtivos.filter(function (projeto) {
    var textoProjeto = normalizarTexto([projeto.titulo, projeto.area, projeto.descricao].join(' '));
    return textoProjeto.includes(termo) && (!areaSelecionada || projeto.area === areaSelecionada);
  });
  var resultado = raiz.querySelector('#resultado-projetos');

  if (resultado) {
    resultado.textContent = projetosFiltrados.length + (projetosFiltrados.length === 1 ? ' projeto encontrado' : ' projetos encontrados');
  }

  if (projetosFiltrados.length === 0) {
    lista.innerHTML = '<p class="projetos__vazio">Nenhum projeto corresponde à busca.</p>';
    return;
  }

  lista.innerHTML = projetosFiltrados.map(function (projeto) {
    return `
      <article class="cartao-projeto">
        <h2>${escaparHTML(projeto.titulo)}</h2>
        <p class="cartao-projeto__tag">${escaparHTML(projeto.area)}</p>
        <p>${escaparHTML(projeto.descricao)}</p>
      </article>
    `;
  }).join('');
};

window.inicializarFiltrosProjetos = function (raiz) {
  var busca = raiz.querySelector('#busca-projetos');
  var filtroArea = raiz.querySelector('#area-projetos');
  if (!busca || !filtroArea) return;

  busca.addEventListener('input', function () {
    window.renderizarProjetos(raiz);
  });
  filtroArea.addEventListener('change', function () {
    window.renderizarProjetos(raiz);
  });
};
