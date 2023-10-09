class Validador {

    constructor() {
        this.validacoes = [
            'data-min-length',
            'data-max-length',
            'data-only-letters',
            'data-email-validate',
            'data-required',
            'data-equal',
            'data-password-validate',
            'data-phone-validate',
        ];
    }

    // inicia a validação de todos os campos
    validar(formulario) {
        // limpa todas as validações antigas
        let validacoesAtuais = document.querySelectorAll('form .error-validation');

        if (validacoesAtuais.length) {
            this.limparValidacoes(validacoesAtuais);
        }

        // pegar todos os inputs
        let inputs = formulario.getElementsByTagName('input');
        // transformar HTMLCollection em array
        let arrayInputs = [...inputs];

        // loop nos inputs e validação mediante aos atributos encontrados
        arrayInputs.forEach(function (input, obj) {
            // fazer validação de acordo com o atributo do input
            for (let i = 0; this.validacoes.length > i; i++) {
                if (input.getAttribute(this.validacoes[i]) != null) {
                    // limpa string para saber o método
                    let metodo = this.validacoes[i].replace("data-", "").replace("-", "");
                    // valor do input
                    let valor = input.getAttribute(this.validacoes[i]);
                    // invoca o método
                    this[metodo](input, valor);
                }
            }
        }, this);

        // Validar telefone
        const telefoneInput = formulario.querySelector('[data-phone-validate]');
        if (telefoneInput) {
            this.phonevalidate(telefoneInput);
        }
    }

    // método para validar se tem um mínimo de caracteres
    minlength(input, valorMinimo) {
        let comprimentoInput = input.value.length;
        let mensagemErro = `O campo precisa ter pelo menos ${valorMinimo} caracteres`;

        if (comprimentoInput < valorMinimo) {
            this.exibirMensagem(input, mensagemErro);
        }
    }

    // método para validar se passou do máximo de caracteres
    maxlength(input, valorMaximo) {
        let comprimentoInput = input.value.length;
        let mensagemErro = `O campo precisa ter menos que ${valorMaximo} caracteres`;

        if (comprimentoInput > valorMaximo) {
            this.exibirMensagem(input, mensagemErro);
        }
    }

    // método para validar strings que só contêm letras
    onlyletters(input) {
        let re = /^[A-Za-z]+$/;
        let valorInput = input.value;
        let mensagemErro = `Este campo não aceita números nem caracteres especiais`;

        if (!re.test(valorInput)) {
            this.exibirMensagem(input, mensagemErro);
        }
    }

    // método para validar e-mail
    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;
        let email = input.value;
        let mensagemErro = `Insira um e-mail no padrão proz@email.com`;

        if (!re.test(email)) {
            this.exibirMensagem(input, mensagemErro);
        }
    }

    // verificar se um campo está igual ao outro
    equal(input, nomeInput) {
        let inputParaComparar = document.getElementsByName(nomeInput)[0];
        let mensagemErro = `Este campo precisa estar igual ao ${nomeInput}`;

        if (input.value != inputParaComparar.value) {
            this.exibirMensagem(input, mensagemErro);
        }
    }

    // método para exibir inputs que são necessários
    required(input) {
        let valorInput = input.value;
        if (valorInput === '') {
            let mensagemErro = `Este campo é obrigatório`;
            this.exibirMensagem(input, mensagemErro);
        }
    }

    // validando o campo de senha
    passwordvalidate(input) {
        let charArr = input.value.split("");
        let maiusculas = 0;
        let numeros = 0;

        for (let i = 0; charArr.length > i; i++) {
            if (charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                maiusculas++;
            } else if (!isNaN(parseInt(charArr[i]))) {
                numeros++;
            }
        }

        if (maiusculas === 0 || numeros === 0) {
            let mensagemErro = `A senha precisa de um caractere maiúsculo e um número`;
            this.exibirMensagem(input, mensagemErro);
        }
    }

    // método para validar números de telefone no formato (XX) XXXXX-XXXX
    phonevalidate(input) {
        let re = /^\(\d{2}\) \d{5}-\d{4}$/;
        let phoneNumber = input.value;
        let mensagemErro = `Insira um número de telefone válido no formato (XX) XXXXX-XXXX`;

        if (!re.test(phoneNumber)) {
            this.exibirMensagem(input, mensagemErro);
        }
    }

    // método para imprimir mensagens de erro
    exibirMensagem(input, msg) {
        let quantErros = input.parentNode.querySelector('.error-validation');

        if (quantErros === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);
            template.textContent = msg;
            let inputPai = input.parentNode;
            template.classList.remove('template');
            inputPai.appendChild(template);
        }
    }

    // remove todas as validações para fazer a checagem novamente
    limparValidacoes(validacoes) {
        validacoes.forEach(el => el.remove());
    }

}

let formulario = document.getElementById('register-form');
let botaoEnviar = document.getElementById('btn-submit');

let validador = new Validador();

// evento de envio do formulário, que valida os inputs
botaoEnviar.addEventListener('click', function (e) {
    e.preventDefault();
    validador.validar(formulario);
});

