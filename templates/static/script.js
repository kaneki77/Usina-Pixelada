function toggleValvula(botao) {
    botao.classList.toggle('ativo');
    botao.textContent = botao.classList.contains('ativo') ? 'Aberta' : 'Fechada';
}

function atualizarLeituras() {
    fetch('/dados')
        .then(response => response.json())
        .then(data => {
            document.getElementById('temperatura').textContent = data.temperatura;
            document.getElementById('pressao').textContent = data.pressao;
        });
}

setInterval(atualizarLeituras, 3000);
atualizarLeituras();
