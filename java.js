
let vozes = [];
let falaAtual = null;

function carregarVozes() {

    vozes = window.speechSynthesis.getVoices();

    const seletor = document.getElementById("voz");

    const vozesPortugues = vozes.filter(voz =>
        voz.lang.toLowerCase().startsWith("pt")
    );

    seletor.innerHTML = "";

    vozesPortugues.forEach((voz, index) => {

        const opcao = document.createElement("option");

        opcao.value = index;
        opcao.textContent = voz.name + " (" + voz.lang + ")";

        seletor.appendChild(opcao);

    });

    if (vozesPortugues.length === 0) {

        const opcao = document.createElement("option");

        opcao.value = "";
        opcao.textContent = "Voz padrão do navegador";

        seletor.appendChild(opcao);

    }

}

window.speechSynthesis.onvoiceschanged = carregarVozes;

carregarVozes();

function ouvirTexto() {

    const texto = document.getElementById("texto").value.trim();

    if (!texto) {
        alert("Por favor, digite um texto primeiro!");
        return;
    }

    window.speechSynthesis.cancel();

    falaAtual = new SpeechSynthesisUtterance(texto);

    falaAtual.lang = "pt-BR";

    const velocidade = document.getElementById("velocidade").value;

    falaAtual.rate = Number(velocidade);

    const seletor = document.getElementById("voz");

    if (seletor.value !== "") {

        const vozesPortugues = vozes.filter(voz =>
            voz.lang.toLowerCase().startsWith("pt")
        );

        falaAtual.voice = vozesPortugues[Number(seletor.value)];

        falaAtual.lang = falaAtual.voice.lang;

    }

    window.speechSynthesis.speak(falaAtual);

}

function pausarTexto() {

    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
    }

}

function continuarTexto() {

    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }

}

function pararTexto() {

    window.speechSynthesis.cancel();

}

document.getElementById("velocidade").addEventListener(
    "input",
    function() {

        document.getElementById("valorVelocidade").textContent =
            "Velocidade: " + this.value + "x";

    }
);
