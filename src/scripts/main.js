document.addEventListener('DOMContentLoaded', function() {
    let historico = [];

    // Evento para quando o formulário é enviado
    document.getElementById('form-sorteador').addEventListener('submit', function(evento) {
        evento.preventDefault();

        let numMin = parseInt(document.getElementById('num-minimo').value);
        let numMax = parseInt(document.getElementById('num-maximo').value);

        // Valida o intervalo
        if (numMin >= numMax) {
            alert('O número mínimo deve ser menor que o número máximo.');
            return;
        }

        // Gera os números sorteados
        let numeroAleatorio = sortearNumero(numMin, numMax);

        // Atualiza a exibição do número sorteado
        document.getElementById('resultado-valor').innerText = numeroAleatorio;
        document.querySelector('.resultado').style.display = 'block';

        // Atualiza o histórico
        atualizarHistorico(numeroAleatorio);

        // Exibe o histórico apenas após o primeiro número sorteado
        document.querySelector('.historico').style.display = 'block';

        // Verifica se todos os números foram sorteados
        if (historico.length === (numMax - numMin + 1)) {
            mostrarModal("Todos os números já foram sorteados.");
        }
    });

    // Evento para quando o número máximo é alterado
    document.getElementById('num-maximo').addEventListener('input', function() {
        let numMin = parseInt(document.getElementById('num-minimo').value);
        let numMax = parseInt(this.value);

        // Limpa o histórico se o intervalo mudar
        if (numMin < numMax) {
            historico = [];
            document.getElementById('historico-valores').innerHTML = '';
            document.querySelector('.historico').style.display = 'none';
        }
    });

    function sortearNumero(min, max) {
        let numeroAleatorio;
        do {
            numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (historico.includes(numeroAleatorio));
        return numeroAleatorio;
    }

    function atualizarHistorico(numero) {
        let listaHistorico = document.getElementById('historico-valores');
        let itemHistorico = document.createElement('li');
        itemHistorico.textContent = numero;
        listaHistorico.appendChild(itemHistorico);
        historico.push(numero);
    }

    function mostrarModal(mensagem) {
        // Cria o modal dinamicamente
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        let spanClose = document.createElement('span');
        spanClose.classList.add('close');
        spanClose.innerHTML = '&times;';
        spanClose.onclick = function() {
            modal.style.display = 'none';
        };

        let pMensagem = document.createElement('p');
        pMensagem.textContent = mensagem;

        modalContent.appendChild(spanClose);
        modalContent.appendChild(pMensagem);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        modal.style.display = 'block';
    }
});