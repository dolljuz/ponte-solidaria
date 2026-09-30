// Máscaras de entrada aplicadas em tempo real nos campos do formulário.
// Cada função recebe o valor bruto (apenas dígitos) e devolve o valor formatado.

function mascararCPF(valor) {
  return valor
    .replace(/\D/g, '')           // remove tudo que não é dígito
    .slice(0, 11)                 // limita a 11 dígitos
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function mascararTelefone(valor) {
  valor = valor.replace(/\D/g, '').slice(0, 11);

  if (valor.length <= 10) {
    // Telefone fixo: (00) 0000-0000
    return valor
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
  }

  // Celular: (00) 00000-0000
  return valor
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
}

function mascararCEP(valor) {
  return valor
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d{1,3})$/, '$1-$2');
}

window.inicializarMascaras = function (raiz) {
  var campoCPF = raiz.querySelector('#cpf');
  var campoTelefone = raiz.querySelector('#telefone');
  var campoCEP = raiz.querySelector('#cep');

  if (campoCPF) {
    campoCPF.addEventListener('input', function (evento) {
      evento.target.value = mascararCPF(evento.target.value);
    });
  }

  if (campoTelefone) {
    campoTelefone.addEventListener('input', function (evento) {
      evento.target.value = mascararTelefone(evento.target.value);
    });
  }

  if (campoCEP) {
    campoCEP.addEventListener('input', function (evento) {
      evento.target.value = mascararCEP(evento.target.value);
    });
  }
};
