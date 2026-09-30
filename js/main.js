document.addEventListener('DOMContentLoaded', function () {
  var principal = document.querySelector('main');
  var botaoMenu = document.getElementById('botaoMenu');
  var listaNav = document.getElementById('listaNav');

  if (!principal) return;

  if (botaoMenu && listaNav) {
    botaoMenu.addEventListener('click', function () {
      var aberto = listaNav.classList.toggle('aberto');
      botaoMenu.setAttribute('aria-expanded', aberto);
    });
  }

  function inicializarInteracoes() {
    if (window.renderizarProjetos) window.renderizarProjetos(principal);
    if (window.inicializarPreferencias) window.inicializarPreferencias(principal);
    if (window.inicializarMascaras) window.inicializarMascaras(principal);
    if (window.inicializarValidacao) window.inicializarValidacao(principal);
  }

  function atualizarLinkAtivo() {
    document.querySelectorAll('.navegacao__lista a').forEach(function (link) {
      var destino = new URL(link.href, window.location.href);
      if (destino.pathname === window.location.pathname) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  async function navegar(url, atualizarHistorico) {
    try {
      var resposta = await fetch(url.href);
      if (!resposta.ok) throw new Error('Falha ao carregar a página.');

      var documento = new DOMParser().parseFromString(await resposta.text(), 'text/html');
      var novoPrincipal = documento.querySelector('main');
      if (!novoPrincipal) throw new Error('A página não contém o elemento main.');

      principal.innerHTML = novoPrincipal.innerHTML;
      document.title = documento.title;
      if (atualizarHistorico) history.pushState({}, '', url.href);

      if (botaoMenu && listaNav) {
        botaoMenu.setAttribute('aria-expanded', 'false');
        listaNav.classList.remove('aberto');
      }

      atualizarLinkAtivo();
      inicializarInteracoes();
      window.scrollTo(0, 0);
    } catch (erro) {
      window.location.assign(url.href);
    }
  }

  document.addEventListener('click', function (evento) {
    if (evento.defaultPrevented || evento.button !== 0 || evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return;

    var link = evento.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;

    var destino = new URL(link.href, window.location.href);
    if (destino.origin !== window.location.origin || !destino.pathname.includes('/html/')) return;
    if (destino.pathname === window.location.pathname && destino.hash) return;
    if (!['http:', 'https:'].includes(window.location.protocol)) return;

    evento.preventDefault();
    navegar(destino, true);
  });

  window.addEventListener('popstate', function () {
    navegar(new URL(window.location.href), false);
  });

  inicializarInteracoes();
  atualizarLinkAtivo();
});
