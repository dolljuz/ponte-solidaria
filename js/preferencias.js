var CHAVE_PREFERENCIAS = 'ponteSolidaria.preferencias';

window.restaurarPreferenciaArea = function (raiz) {
  var campoArea = raiz.querySelector('#area');
  if (!campoArea) return;

  try {
    var dadosSalvos = localStorage.getItem(CHAVE_PREFERENCIAS);
    if (!dadosSalvos) return;

    var preferencias = JSON.parse(dadosSalvos);
    var opcaoExiste = Array.from(campoArea.options).some(function (opcao) {
      return opcao.value === preferencias.area;
    });

    if (typeof preferencias.area === 'string' && opcaoExiste) {
      campoArea.value = preferencias.area;
    }
  } catch (erro) {
    return;
  }
};

window.inicializarPreferencias = function (raiz) {
  var campoArea = raiz.querySelector('#area');
  if (!campoArea) return;

  window.restaurarPreferenciaArea(raiz);

  campoArea.addEventListener('change', function () {
    try {
      localStorage.setItem(CHAVE_PREFERENCIAS, JSON.stringify({ area: campoArea.value }));
    } catch (erro) {
      return;
    }
  });
};