let jogador = {
    nome: "",
    ataque: 0,
    vida: 0,
};

const esqueletos = {
    ataque: 0,
    vida: 0,
};


function startGame() {
    let nomeJogador = prompt("Qual é o seu nome mesmo?");

    if (!nomeJogador || nomeJogador.trim() === "") {
        alert("Por favor, digite um nome válido.");
    } else {
        document.getElementById("title").innerHTML = `A aventura de ${nomeJogador}`;
        document.getElementById("welcome").style.display = "none";
        document.getElementById("atributes").style.display = "flex";

        document.getElementById("msg1").innerHTML = `Muito bem, ${nomeJogador}!`;

        jogador.nome = nomeJogador;
    }
}


function setAttributes() {
    const pontos = 20;

    let ataqueJogador = parseInt(prompt(
        `Qual é o seu ataque?\n\nVocê tem ${pontos} pontos restantes.`
    ));
    let vidaJogador = parseInt(prompt(
        `Qual é a sua vida?\n\nVocê tem ${pontos - ataqueJogador} pontos restantes.`
    ));

    if (isNaN(ataqueJogador) || isNaN(vidaJogador)) {
        alert("Por favor, digite um valor numérico.");
    } else if (ataqueJogador < 0 || vidaJogador < 0) {
        alert("Por favor, digite valores não negativos.");
    } else if (ataqueJogador + vidaJogador > pontos) {
        alert("Parece que você gastou pontos demais!");
    } else {
        document.getElementById("atributes").style.display = "none";
        document.getElementById("summary").style.display = "flex";

        document.getElementById("msg2").innerHTML = `Seu nome é: ${jogador.nome
            }<br>seu Ataque: ${ataqueJogador * 10}<br> e sua Vida: ${vidaJogador * 100
            }`;

        jogador.ataque = ataqueJogador * 10;
        jogador.vida = vidaJogador * 100;

        return { ataque: jogador.ataque, vida: jogador.vida };
    }
}


function adventure() {
    document.getElementById("summary").style.display = "none";
    document.getElementById("exploreONE").style.display = "flex";
    document.getElementById(
        "msg3"
    ).innerHTML = `Então, ${jogador.nome}... já se passaram alguns dias desde que você se juntou a Guilda dos Aventureuiros. Pelo visto você não se lembra, mas logo antes de aparecer aqui você estava perambulando pela área da Masmorra de Ferro, aqui pertinho... Eu recomendo que você volte a entrada da masmorra e tente novos caminhos.`;
}


function goTo() {
    document.getElementById("btnGoTo").disabled = true;
    document.getElementById("btnGoTo").classList.add("disabled-button");
    document.getElementById("exploreONE").style.opacity = "0.5";
    document.getElementById("exploreTWO").style.display = "flex";
}


function explorarEntrada() {
    const chance = Math.random();

    if (chance < 0.5) {
        jogador.vida += 200;
        document.getElementById(
            "msg4"
        ).innerHTML = `Parabéns, ${jogador.nome}!<br>Você encontrou Carne de Lagardão e adquiriu 200 de vida. Agora você tem ${jogador.vida} de vida.`;
    } else {
        jogador.ataque *= 1.1;
        document.getElementById(
            "msg4"
        ).innerHTML = `Infelizmente parece que não há nada por aqui que possa ajudar. Pelo menos você se exercitou um pouco e adquiriu 10% de ataque. Agora você tem ${jogador.ataque} de ataque.`;
    }

    document.getElementById("btnExplorarMasmorra").disabled = true;
    document.getElementById("btnExplorarMasmorra").classList.add("disabled-button");

    return;
}


function entrarMasmorra() {
    document.getElementById("btnExplorarMasmorra").disabled = true;
    document.getElementById("btnEntrarMasmorra").disabled = true;
    document.getElementById("btnExplorarMasmorra").classList.add("disabled-button");
    document.getElementById("btnEntrarMasmorra").classList.add("disabled-button");

    document.getElementById("exploreTHREE").style.display = "flex";
    document.getElementById("exploreTWO").style.opacity = "0.5";
}


function explorarAntecamara() {
    document.getElementById("btnExplorarAntecamara").disabled = true;
    document.getElementById("btnExplorarAntecamara").classList.add("disabled-button");
    document.getElementById("msg5-box").style.display = "block";
}


function tocarObj() {
    const chance = Math.random();
    let jogadorV = jogador.vida;
    let jogadorA = jogador.ataque;

    if (chance < 0.5) {
        jogadorV *= 2;
        jogadorA /= 2;

        document.getElementById(
            "msg5"
        ).innerHTML = `${jogador.nome}! Você recebeu a maldição da Vida. Seus pontos de vida agora são o dobro (${jogadorV}), mas seus pontos de ataque caíram pela metade (${jogadorA}).`;

    } else {
        jogadorA *= 2;
        jogadorV /= 2;

        document.getElementById(
            "msg5"
        ).innerHTML = `${jogador.nome}! Você recebeu a maldição do Ataque. Seus pontos de ataque agora são o dobro (${jogadorA}), mas seus pontos de vida caíram pela metade (${jogadorV}).`;
    }

    jogador.vida = jogadorV;
    jogador.ataque = jogadorA;

    document.getElementById("btnTocar").disabled = true;
    document.getElementById("btnTocar").classList.add("disabled-button");

    return;
}


function seguirAntecamara() {
    document.getElementById("btnSeguirAntecamara").disabled = true;
    document.getElementById("btnExplorarAntecamara").disabled = true;
    document.getElementById("btnExplorarAntecamara").classList.add("disabled-button");
    document.getElementById("btnSeguirAntecamara").classList.add("disabled-button");

    document.getElementById("exploreTHREE").style.opacity = "0.5";
    document.getElementById("exploreFOUR").style.display = "flex";

    const checkEntry = document.getElementById("btnTocar").disabled;

    if (checkEntry) {
        document.getElementById(
            "msg6"
        ).innerHTML = `${jogador.nome}! Se prepare um exército de esqueletos se aproxima!`;
    } else {
        jogador.vida -= jogador.vida * 0.05; 
        document.getElementById(
            "msg6"
        ).innerHTML = `Ao se adiantar para a entrada, você tropega e perde 5% de sua vida. Você agora tem ${jogador.vida} de vida.<br><br>${jogador.nome}! Se prepare um exército de esqueletos se aproxima!`;

        return jogador.vida;
    }
}
