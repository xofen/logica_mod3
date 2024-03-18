let jogador = {
    nome: "",
    ataque: 0,
    vida: 0,
};

const esqueletos = {
    ataque: 100,
    vida: 1,
};

const boss = {
    nome: "",
    ataque: 300,
    vida: 1,
}; 

function reverseName(name) {
    return name.split("").reverse().join("");
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


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
        boss.nome = capitalizeFirstLetter(reverseName(jogador.nome).toLowerCase());
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

        document.getElementById("msg2").innerHTML = `Seu nome é::`;
        document.getElementById("msg2a").innerHTML = ` ${jogador.nome}`;
        document.getElementById("msg2b").innerHTML = `seus atributos::`;
        document.getElementById("msg2c").innerHTML = `vida::  ${vidaJogador * 100}<br><br>ataque::  ${ataqueJogador * 10}`;

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
    document.getElementById("exploreTWO").scrollIntoView();
}


function explorarEntrada() {
    const chance = Math.random();

    document.getElementById("msg4").style.display = "block";

    if (chance < 0.5) {
        jogador.vida += 200;
        document.getElementById(
            "msg4"
        ).innerHTML = `Parabéns, ${jogador.nome}!<br>Você encontrou Carne de Lagardão e adquiriu 200 de vida. Agora você tem ${jogador.vida} de vida.`;
    } else {
        jogador.ataque = Math.round(jogador.ataque * 1.1);
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

    document.getElementById("exploreTHREE").scrollIntoView();
}


function explorarAntecamara() {
    document.getElementById("btnExplorarAntecamara").disabled = true;
    document.getElementById("btnExplorarAntecamara").classList.add("disabled-button");
    document.getElementById("msg5-box").style.display = "flex";
    document.getElementById("msg5-btn").style.display = "flex";
    
    document.getElementById("exploreFOUR").scrollIntoView();
}


function tocarObj() {
    const chance = Math.random();
    let curseType, curseDescription, healthModifier, attackModifier;

    if (chance < 0.5) {
        curseType = "vida";
        curseDescription = "da Vida";
        healthModifier = 2;
        attackModifier = 0.5;
    } else {
        curseType = "ataque";
        curseDescription = "do Ataque";
        healthModifier = 0.5;
        attackModifier = 2;
    }

    jogador.vida *= healthModifier;
    jogador.ataque *= attackModifier;

    const message = `${jogador.nome}! Você recebeu a maldição ${curseDescription}. Seus pontos de vida agora são ${healthModifier === 2 ? 'o dobro' : 'a metade'} (${jogador.vida}), mas seus pontos de ataque ${attackModifier === 2 ? 'dobraram' : 'caíram pela metade'} (${jogador.ataque}).`;

    document.getElementById("msg5").innerHTML = message;
    document.getElementById("msg5").style.display = "block";

    document.getElementById("btnTocar").disabled = true;
    document.getElementById("btnTocar").classList.add("disabled-button");
}


function seguirAntecamara() {
    document.getElementById("btnSeguirAntecamara").disabled = true;
    document.getElementById("btnExplorarAntecamara").disabled = true;
    document.getElementById("btnTocar").disabled = true;
    document.getElementById("btnExplorarAntecamara").classList.add("disabled-button");
    document.getElementById("btnSeguirAntecamara").classList.add("disabled-button");
    document.getElementById("btnTocar").classList.add("disabled-button");

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

        return Math.round(jogador.vida);
    }

    
    document.getElementById("exploreFOUR").scrollIntoView();
}


function lutarEsqueletos() {
    document.getElementById("btnLutarEsqueletos").disabled = true;
    document.getElementById("btnSairEsqueletos").disabled = true;
    document.getElementById("btnLutarEsqueletos").classList.add("disabled-button");
    document.getElementById("btnSairEsqueletos").classList.add("disabled-button");

    document.getElementById("exploreFOUR").style.opacity = "0.5";

    let jogadorV = jogador.vida;
    let jogadorA = jogador.ataque;

    let esqueletosV = esqueletos.vida;
    let esqueletosA = esqueletos.ataque;

    while (jogadorV > 0 && esqueletosV > 0) {
        alert(`${jogador.nome}, sua vez!`);
        let jogadorAttck = prompt("Escolha seu ataque! ('NORMAL', 'COMBO' ou 'ESPECIAL')");

        let damageDealt;

        switch(jogadorAttck.toLowerCase()) {
            case "normal":
                damageDealt = jogadorA;
                break;

            case "combo":
                if (Math.random() < 0.5) {
                    damageDealt = jogadorA * 2;
                } else {
                    alert("Você errou seu ataque!");
                    damageDealt = 0;
                }
                break;

            case "especial":
                if (Math.random() > 0.8) {
                    damageDealt = jogadorA * 4;
                } else {
                    alert("Você errou seu ataque!");
                    damageDealt = 0;
                }
                break;

            default:
                alert("Você não sabe esse ataque! Que pena...");
                damageDealt = 0;
        }

        esqueletosV -= damageDealt;
        alert(`Você tirou ${damageDealt} pontos de vida dos esqueletos. Ainda restam ${esqueletosV}!`);

        if (esqueletosV <= 0) {
            alert(`Parabéns, ${jogador.nome}! Você derrotou os esqueletos!`);

            document.getElementById("exploreFIVEwin").style.display = "flex";

            document.getElementById("exploreFIVEwin").scrollIntoView();

            return jogador.vida;
        }

        alert("Os esqueletos atacam!");

        let damageTaken;
        let ataqueInimigo = Math.random();

        if (ataqueInimigo <= 0.5) {
            damageTaken = esqueletosA;
        } else if (ataqueInimigo <= 0.8) {
            damageTaken = esqueletosA * 2;
        } else {
            damageTaken = esqueletosA * 4;
        }

        jogadorV -= damageTaken;
        alert(`Os esqueletos atacam e tiram ${damageTaken} pontos de vida de você. Restam ${jogadorV}`);

        if (jogadorV <= 0) {
            alert(`Você foi derrotado pelos esqueletos. Game Over.`);
            
            document.getElementById("exploreFIVElose").style.display = "flex";
            
            document.getElementById("exploreFIVElose").scrollIntoView();
            
            break;
        }
    }
}


function sairEsqueletos() {
    location.replace("https://www.youtube.com/watch?v=h4UqMyldS7Q");
}


function recomecar() {
    location.reload("https://www.youtube.com/watch?v=GA7LcSX8tYE");
}


function frasco(x) {
    switch(x) {
        case 'pouco':
            jogador.vida += 2000;

            document.getElementById("btnBeberUmPouco").disabled = true;
            document.getElementById("btnBeberUmPouco").classList.add("disabled-button");
            document.getElementById("btnBeberTudo").disabled = true;
            document.getElementById("btnBeberTudo").classList.add("disabled-button");
            document.getElementById("btnQuebrarFrasco").disabled = true;
            document.getElementById("btnQuebrarFrasco").classList.add("disabled-button");
            
            document.getElementById("msg7").style.display = "block";
            document.getElementById("msg7").innerHTML = `Parabéns, ${jogador.nome}!<br><br>A dose é a diferença entre a cura e o veneno! Sua vida aumentou em 2000.<br><br>Agora você tem ${jogador.vida} de vida.`;

            document.getElementById("title-frasco").innerHTML = "::agora sim::";
            
            break;
            case 'tudo':
            jogador.vida = Math.round(jogador.vida * 1.45);

            document.getElementById("btnBeberUmPouco").disabled = true;
            document.getElementById("btnBeberUmPouco").classList.add("disabled-button");
            document.getElementById("btnBeberTudo").disabled = true;
            document.getElementById("btnBeberTudo").classList.add("disabled-button");
            document.getElementById("btnQuebrarFrasco").disabled = true;
            document.getElementById("btnQuebrarFrasco").classList.add("disabled-button");
            
            document.getElementById("title-frasco").innerHTML = "::agora sim::";

            document.getElementById("msg7").style.display = "block";
            document.getElementById("msg7").innerHTML = `Uau, ${jogador.nome}!<br><br>Pelo menos de sede você não.... né! Sua vida aumentou em 45%. Agora você tem ${jogador.vida} de vida.`;

            break;
        case 'quebrar':
            jogador.ataque = Math.round(jogador.ataque * 1.45);

            document.getElementById("btnBeberUmPouco").disabled = true;
            document.getElementById("btnBeberUmPouco").classList.add("disabled-button");
            document.getElementById("btnBeberTudo").disabled = true;
            document.getElementById("btnBeberTudo").classList.add("disabled-button");
            document.getElementById("btnQuebrarFrasco").disabled = true;
            document.getElementById("btnQuebrarFrasco").classList.add("disabled-button");

            document.getElementById("title-frasco").innerHTML = "::agora sim::";

            document.getElementById("msg7").style.display = "block";
            document.getElementById("msg7").innerHTML = `${jogador.nome}!<br><br>O frasco quebrou!<br><br>O líquido vermelho ao entrar em contato com o chão evapora em uma névoa púrpura que invade suas narinas.<br><br>Ao respirar tal substância seu ataque aumentou em 45%. Agora você tem ${jogador.ataque} de ataque.`;

            break;
    }
}


function continuar() {
    document.getElementById("btnContinuar").disabled = true;
    document.getElementById("btnContinuar").disabled = true;
    document.getElementById("btnContinuar").classList.add("disabled-button");

    document.getElementById("exploreFIVEwin").style.opacity = "0.5";
    document.getElementById("exploreSIX").style.display = "flex";

    document.getElementById("exploreSIX").scrollIntoView();
}


function entrarCasa() {
    location.reload("https://www.youtube.com/watch?v=lin8YHV9tvo");
}


function entrarOuro() {
    document.getElementById("btnOuro").disabled = true;
    document.getElementById("btnFerro").disabled = true;
    document.getElementById("btnCasa").disabled = true;
    document.getElementById("btnOuro").classList.add("disabled-button");
    document.getElementById("btnFerro").classList.add("disabled-button");
    document.getElementById("btnCasa").classList.add("disabled-button");

    document.getElementById("exploreSIX").style.opacity = "0.5";
    document.getElementById("exploreSEVEN").style.display = "flex";

    
    document.getElementById("exploreSEVEN").scrollIntoView();

    boss.ataque *= 2;
    boss.vida *= 1.3;

    document.getElementById("seven-title").innerHTML = "Poder, riqueza e mais...";
    document.getElementById("msg8").innerHTML = `Atrás dela você encontra ouro, cristais, etc... e já começa a imaginar toda a glória e poder que poderá onter com este tesouro praticamente infinito.`;
    document.getElementById("msg8a").innerHTML = `Assim que você toca a primeira moeda a seu alncace uma voz grave e ecoante chama seu nome...`;
    document.getElementById("msg8b").innerHTML = `"Então você prefere assim? Acha que seria fácil?"`;
    document.getElementById("msg8c").innerHTML = `o temível ${boss.nome} surge! com uma aura de poder nunca antes vista...`;
}

function entrarFerro() {
    document.getElementById("btnOuro").disabled = true;
    document.getElementById("btnFerro").disabled = true;
    document.getElementById("btnCasa").disabled = true;
    document.getElementById("btnOuro").classList.add("disabled-button");
    document.getElementById("btnFerro").classList.add("disabled-button");
    document.getElementById("btnCasa").classList.add("disabled-button");

    document.getElementById("exploreSIX").style.opacity = "0.5";
    document.getElementById("exploreSEVEN").style.display = "flex";

    document.getElementById("exploreSEVEN").scrollIntoView();

    jogador.ataque *= 1.6;
    jogador.vida *= 1.6;

    document.getElementById("seven-title").innerHTML = "Poder, riqueza e mais...";
    document.getElementById("msg8").innerHTML = `após atravessa-la tudo sua volta desparece. o infinito é seu novo horizonte...`;
    document.getElementById("msg8a").innerHTML = `alguns minutos se passam até que você consegue escutar alguém chamando por seu nome.`;
    document.getElementById("msg8b").innerHTML = `"Finalmente você conseguiu chegar até minhã moradia. Seus passos até aqui não foram fáceis, não espere nenhum tipo de alívio agora..."`;
    document.getElementById("msg8c").innerHTML = `${boss.nome}, o semeador de todo o mal corre em sua direção!`;
}
