// Validação nativa (HTML5) com mensagens de erro customizadas em português.

window.inicializarValidacao = function (raiz) {
  var formulario = raiz.querySelector('#formCadastro');
  if (!formulario) return;

  var mensagensPersonalizadas = {
    nome: 'Digite seu nome completo (mínimo 3 letras).',
    email: 'Digite um e-mail válido, no formato nome@exemplo.com.',
    cpf: 'Digite um CPF no formato 000.000.000-00.',
    telefone: 'Digite um telefone no formato (00) 00000-0000.',
    cep: 'Digite um CEP no formato 00000-000.',
    bairro: 'Digite o nome do bairro.',
    area: 'Selecione uma área de interesse.'
  };

  function validarCampo(campo) {
    campo.dataset.tocado = 'true';
    var mensagemErro = raiz.querySelector('#erro-' + campo.id);
    campo.setCustomValidity('');

    if (campo.validity.valid) {
      campo.removeAttribute('aria-invalid');
      if (mensagemErro) mensagemErro.textContent = '';
      return true;
    }

    var texto = mensagensPersonalizadas[campo.id] || 'Verifique este campo.';
    campo.setCustomValidity(texto);
    campo.setAttribute('aria-invalid', 'true');
    if (mensagemErro) mensagemErro.textContent = texto;
    return false;
  }

  // Valida cada campo assim que o usuário sai dele
  var camposObrigatorios = formulario.querySelectorAll('[required]');
  camposObrigatorios.forEach(function (campo) {
    campo.addEventListener('blur', function () {
      validarCampo(campo);
    });

    // Revalida enquanto digita, depois do primeiro toque no campo
    campo.addEventListener('input', function () {
      if (campo.dataset.tocado === 'true') {
        validarCampo(campo);
      }
    });
  });

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    var todosValidos = true;
    var primeiroInvalido = null;
    camposObrigatorios.forEach(function (campo) {
      var valido = validarCampo(campo);
      if (!valido) {
        todosValidos = false;
        if (!primeiroInvalido) primeiroInvalido = campo;
      }
    });

    var mensagemConfirmacao = raiz.querySelector('#mensagemConfirmacao');

    if (todosValidos) {
      mensagemConfirmacao.hidden = false;
      formulario.reset();
      if (window.restaurarPreferenciaArea) window.restaurarPreferenciaArea(raiz);
      camposObrigatorios.forEach(function (campo) {
        campo.dataset.tocado = 'false';
        campo.removeAttribute('aria-invalid');
        var erro = raiz.querySelector('#erro-' + campo.id);
        if (erro) erro.textContent = '';
      });
    } else {
      mensagemConfirmacao.hidden = true;
      if (primeiroInvalido) primeiroInvalido.focus();
    }
  });
};
