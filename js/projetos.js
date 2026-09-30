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

window.renderizarProjetos = function (raiz) {
  var lista = raiz.querySelector('.projetos');
  if (!lista) return;

  lista.innerHTML = projetosAtivos.map(function (projeto) {
    return `
      <article class="cartao-projeto">
        <h2>${escaparHTML(projeto.titulo)}</h2>
        <p class="cartao-projeto__tag">${escaparHTML(projeto.area)}</p>
        <p>${escaparHTML(projeto.descricao)}</p>
      </article>
    `;
  }).join('');
};
