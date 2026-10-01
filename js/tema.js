var CHAVE_TEMA = 'ponteSolidaria.tema';
var temaSalvo = null;

try {
  temaSalvo = localStorage.getItem(CHAVE_TEMA);
} catch (erro) {
  temaSalvo = null;
}

var temaInicial = temaSalvo === 'escuro' || temaSalvo === 'claro'
  ? temaSalvo
  : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'escuro'
    : 'claro';

document.documentElement.setAttribute('data-tema', temaInicial);

document.addEventListener('DOMContentLoaded', function () {
  var botaoTema = document.getElementById('botaoTema');
  if (!botaoTema) return;

  botaoTema.setAttribute('aria-pressed', String(temaInicial === 'escuro'));
  botaoTema.addEventListener('click', function () {
    temaInicial = document.documentElement.getAttribute('data-tema') === 'escuro'
      ? 'claro'
      : 'escuro';

    document.documentElement.setAttribute('data-tema', temaInicial);
    botaoTema.setAttribute('aria-pressed', String(temaInicial === 'escuro'));

    try {
      localStorage.setItem(CHAVE_TEMA, temaInicial);
    } catch (erro) {
      return;
    }
  });
});