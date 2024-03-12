let jogador = {
    nome: "",
    ataque: 0,
    vida: 0,
};

let monstro = {
    nome: "",
    ataque: 0,
    vida: 0,
};

function startGame() {
    let nomeJogador = prompt("Qual é o seu nome mesmo?");

    if (!nomeJogador) {
        alert("Por favor, digite um nome.");
    } else {
        document.getElementById("title").innerHTML = `A aventura de ${nomeJogador}`;
        document.getElementById("welcome").style.display = "none";
        document.getElementById("atributes").style.display = "flex";

        document.getElementById("msg1").innerHTML = `Muito bem, ${nomeJogador}!`;

        return (jogador.nome = nomeJogador);
    }
}

function setAttributes() {
    const pontos = 20;
    let ataqueJogador = +prompt(
        `Qual é o seu ataque?\n\nVoce tem ${pontos} pontos restantes.`
    );
    let vidaJogador = +prompt(
        `Qual é a sua vida?\n\nVoce tem ${pontos - ataqueJogador} pontos restantes.`
    );

    if (!ataqueJogador || !vidaJogador) {
        alert("Por favor, digite um valor.");
    } else if (ataqueJogador + vidaJogador > pontos) {
        alert("Parece que você gastou pontos de mais!");
    } else if (ataqueJogador + vidaJogador <= 0) {
        alert("Parece que você gastou um valor negativo?");
    } else {
        document.getElementById("atributes").style.display = "none";
        document.getElementById("summary").style.display = "flex";

        document.getElementById("msg2").innerHTML = `Seu nome é: ${jogador.nome
            }<br>seu Ataque: ${ataqueJogador * 10}<br> e sua Vida: ${vidaJogador * 100
            }`;

        jogador.ataque = ataqueJogador * 10;
        jogador.vida = vidaJogador * 100;

        return jogador.ataque, jogador.vida;
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
    document.getElementById("btnGoTo").style.backgroundColor = 'black';
    document.getElementById("btnGoTo").style.color = 'red';
    document.getElementById("exploreONE").style.opacity = "0.5";
    document.getElementById("exploreTWO").style.display = "flex";
}

function explorarEntrada() {
    const chance = Math.random();

    if (chance < 0.5) {
        jogador.vida += 200;
        document.getElementById(
            "msg4"
        ).innerHTML = `Parabens, ${jogador.nome}!<br>Você encontrou Carne de Lagardão e adquiriu 200 de vida. Você agora tem ${jogador.vida} de vida.`;

        document.getElementById("btnExplorarMasmorra").disabled = true;
        document.getElementById("btnExplorarMasmorra").style.backgroundColor = 'black';
        document.getElementById("btnExplorarMasmorra").style.color = 'red';

        return jogador.vida;
    } else {
        jogador.ataque += jogador.ataque * 0.1;
        document.getElementById(
            "msg4"
        ).innerHTML = `Infelizmente parece que não há nada por aqui que possa ajudar. Pelo menos você se exercitou um pouco e adquiriou 10% de ataque. Você agora tem ${jogador.ataque} de ataque.`;

        document.getElementById("btnExplorarMasmorra").disabled = true;
        document.getElementById("btnExplorarMasmorra").style.backgroundColor = 'black';
        document.getElementById("btnExplorarMasmorra").style.color = 'red';

        return jogador.ataque;
    }
}

function entrarMasmorra() {
    document.getElementById("btnExplorarMasmorra").disabled = true;
    document.getElementById("btnEntrarMasmorra").disabled = true;
    document.getElementById("btnExplorarMasmorra").style.backgroundColor = 'black';
    document.getElementById("btnExplorarMasmorra").style.color = 'red';
    document.getElementById("btnEntrarMasmorra").style.backgroundColor = 'black';
    document.getElementById("btnEntrarMasmorra").style.color = 'red';

    document.getElementById("exploreTHREE").style.display = "flex";
    document.getElementById("exploreTWO").style.opacity = "0.5";
}

function explorarAntecamara() {
    document.getElementById("btnExplorarAntecamara").disabled = true;
    document.getElementById("btnExplorarAntecamara").style.backgroundColor = 'black';
    document.getElementById("btnExplorarAntecamara").style.color = 'red';
    document.getElementById("msg5-box").style.display = "block";
}

function tocarObj() {
    const chance = Math.random();

    if (chance < 0.5) {
        jogador.vida = jogador.vida * 2;
        jogador.ataque = jogador.ataque / 2;

        document.getElementById(
            "msg5"
        ).innerHTML = `${jogador.nome}! Você recebeu a maldição da Vida. Seus pontos de vida agora são o dobro (${jogador.vida}), mas seus pontos de ataque cairam pela metade (${jogador.ataque}).`;

        document.getElementById("btnTocar").disabled = true;
        document.getElementById("btnTocar").style.backgroundColor = 'black';
        document.getElementById("btnTocar").style.color = 'red';

        return jogador.vida, jogador.ataque;
    } else {
        jogador.ataque = jogador.ataque * 2;
        jogador.vida = jogador.vida / 2;

        document.getElementById(
            "msg5"
        ).innerHTML = `${jogadorNome}!Você recebeu a maldição do Ataque. Seus pontos de ataque agora são o dobro (${jogador.ataque}), mas seus pontos de vida cairam pela metade (${jogador.vida}).`;

        document.getElementById("btnTocar").disabled = true;
        document.getElementById("btnTocar").style.backgroundColor = 'black';
        document.getElementById("btnTocar").style.color = 'red';

        return jogador.ataque, jogador.vida;
    }
}

function seguirAntecamara() {
    document.getElementById("btnSeguirAntecamara").disabled = true;
    document.getElementById("btnExplorarAntecamara").disabled = true;
    document.getElementById("btnExplorarAntecamara").style.backgroundColor = 'black';
    document.getElementById("btnExplorarAntecamara").style.color = 'red';
    document.getElementById("btnSeguirAntecamara").style.backgroundColor = 'black';
    document.getElementById("btnSeguirAntecamara").style.color = 'red';
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
