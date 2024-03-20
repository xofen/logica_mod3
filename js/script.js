let jogador = {
    nome: "",
    ataque: 0,
    vida: 0,
};

const esqueletos = {
    ataque: 75,
    vida: 800,
};

const boss = {
    nome: "",
    ataque: 130,
    vida: 1500,
};

let pedraNoCaminho = false;

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

        document.getElementById("msg2").innerHTML = `<span class="stand-first">Seu</span> <span class="stand-b">nome</span>::`;
        document.getElementById("msg2a").innerHTML = ` <span class="stand-y">${jogador.nome}</span>`;
        document.getElementById("msg2b").innerHTML = `<span class="stand-first">seus</span> <span class="stand-b">atributos</span>::`;
        document.getElementById("msg2c").innerHTML = `<span class="stand-r">vida</span>::  <span class="stand-y">${vidaJogador * 100}</span><br><br><span class="stand-r">ataque</span>::  <span class="stand-y">${ataqueJogador * 10}</span>`;

        jogador.ataque = ataqueJogador * 10;
        jogador.vida = vidaJogador * 100;

        return { ataque: jogador.ataque, vida: jogador.vida };
    }
}


function adventure() {
    document.getElementById("summary").style.display = "none";
    document.getElementById("exploreONE").style.display = "flex";
    document.getElementById("msg3").innerHTML = `<span class="stand-first">então</span>, ${jogador.nome}...`;
    document.getElementById("msg3a").innerHTML = `<span class="stand-first">já</span> se passaram alguns dias desde que você se juntou a <span class="stand-r">Guilda dos Aventureuiros</span>.`;
    document.getElementById("msg3b").innerHTML = `<span class="stand-first">pelo</span> visto você não se lembra, mas logo antes de aparecer aqui você estava perambulando pela área da <span class="stand-y">Masmorra de Ferro</span>, aqui pertinho...`;
    document.getElementById("msg3c").innerHTML = `<span class="stand-first">eu</span> recomendo que você volte a entrada da masmorra e tente <span class="stand-b">novos caminhos</span>.`;
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
        ).innerHTML = `<span class="stand-first">Parabéns</span>, ${jogador.nome}!<br>Você encontrou <span class="stand-b">Carne de Lagardão</span> e <span class="stand-y">adquiriu 200 de vida</span>. <span class="stand-i">( = ${jogador.vida} )</span>`;
    } else {
        jogador.ataque = Math.round(jogador.ataque * 1.1);
        document.getElementById(
            "msg4"
        ).innerHTML = `<span class="stand-first">Infelizmente</span> parece que <span class="stand-r">não há nada por aqui</span> que possa ajudar. Pelo menos você se <span class="stand-b">exercitou um pouco</span> e <span class="stand-y">adquiriu 10% de ataque</span>. <span class="stand-i">
        ( = ${jogador.ataque} )</span>`;
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
    pedraNoCaminho = true;

    const message = `<span class="stand-first">${jogador.nome}</span>! Você recebeu a <span class="stand-y">maldição ${curseDescription}</span>. Seus pontos de vida agora são ${healthModifier === 2 ? '<span class="stand-b">o dobro</span>' : '<span class="stand-r">a metade</span>'} <span class="stand-i">(= ${jogador.vida})</span>, mas seus pontos de ataque ${attackModifier === 2 ? '<span class="stand-b">dobraram</span>' : '<span class="stand-r">caíram pela metade</span>'} <span class="stand-i">(= ${jogador.ataque})</span>.`;

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

    document.getElementById("exploreFOUR").scrollIntoView();

    if (pedraNoCaminho) {
        document.getElementById(
            "msg6"
        ).innerHTML = `<span class="stand-first">${jogador.nome}</span>! Se prepare um <span class="stand-y">exército de esqueletos</span> se aproxima!`;
    } else {
        jogador.vida -= jogador.vida * 0.05; 
        document.getElementById(
            "msg6"
        ).innerHTML = `<span class="stand-first">Ao</span> se adiantar para a entrada, você <span class="stand-r">tropega</span> e <span class="stand-r">perde</span> <span class="stand-b">5% de sua vida</span> <span class="stand-i">(= ${jogador.vida})</span>.</p><p><span class="stand-first">${jogador.nome}</span>! Se prepare, um <span class="stand-y">exército de esqueletos</span> se aproxima!`;

        return Math.round(jogador.vida);
    }
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

            case "eu_era_moleque":
                damageDealt = esqueletosV;
                break;

            case "kill_all_bots":
                jogadorV -= jogadorV;
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
    window.open("https://www.youtube.com/watch?v=4ek6rjnF9cE", '_blank').focus();
    location.reload();
}


function recomecar() {
    location.reload();
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
            document.getElementById("msg7").innerHTML = `<span class="stand-first">Parabéns</span>, ${jogador.nome}!<br><br><span class="stand-first">a</span> <span class="stand-y">dose</span> é a diferença entre a <span class="stand-b">cura</span> e o <span class="stand-r">veneno</span>!<br><br><span class="stand-first">sua</span> <span class="stand-y">vida</span> aumentou em <span class="stand-y">2000</span>. <span class="stand-i">(= ${jogador.vida})`;

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
            document.getElementById("msg7").innerHTML = `<span class="stand-first">Uau</span>, ${jogador.nome}!<br><br><span class="stand-first">pelo</span> menos de <span class="stand-r">sede</span> você não <span class="stand-r">m...</span> né!?<br><br><span class="stand-first">sua</span> <span class="stand-y">vida</span> aumentou em <span class="stand-y">45%</span>. <span class="stand-i">(= ${jogador.vida})`;

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
            document.getElementById("msg7").innerHTML = `<span class="stand-first">${jogador.nome}</span>!<br><br><span class="stand-first">o</span> <span class="stand-y">frasco</span> quebrou<span class="stand-r">!</span><br><br><span class="stand-first">o</span> <span class="stand-r">líquido vermelho</span> ao entrar em contato com o chão evapora em uma <span class="stand-b">névoa púrpura</span> que invade suas narinas.<br><br><span class="stand-first">ao</span> respirar <span class="stand-b">tal substância</span>, seu <span class="stand-y">ataque</span> aumentou em <span class="stand-y">45%</span>. <span class="stand-i"> ( =${jogador.ataque})`;

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
    document.getElementById("msg8").innerHTML = `<span class="stand-first">atrás</span> dela você encontra <span class="stand-y">ouro, cristais, etc</span>... e já começa a <span class="stand-b">imaginar</span> toda a <span class="stand-r">glória</span> e <span class="stand-r">poder</span> que poderá obter com este tesouro praticamente <span class="stand-y">infinito</span>.`;
    document.getElementById("msg8a").innerHTML = `<span class="stand-first">assim</span> que você toca a primeira moeda <span class="stand-y">uma voz</span> <span class="stand-r">grave</span> e <span class="stand-b">ecoante</span> chama seu nome...`;
    document.getElementById("msg8b").innerHTML = `"<span class="stand-first">então</span>, você prefere assim? Acha que seria <span class="stand-r">fácil</span>?"`;
    document.getElementById("msg8c").innerHTML = `<span class="stand-first">o</span> <span class="stand-r">temível</span> <span class="stand-y">${boss.nome}</span> surge! com uma aura de poder <span class="stand-y">nunca antes vista</span>...`;
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

    document.getElementById("seven-title").innerHTML = `Poder, riqueza e mais...`;
    document.getElementById("msg8").innerHTML = `<span class="stand-first">após</span> atravessa-la <span class="stand-b">tudo a sua volta</span> <span class="stand-y">desparece</span>. o infinito é seu novo horizonte...`;
    document.getElementById("msg8a").innerHTML = `<span class="stand-first">alguns</span> minutos se passam até que você consegue <span class="stand-b">escutar</span> <span class="stand-y">alguém</span> <span class="stand-r">chamando</span> por seu nome.`;
    document.getElementById("msg8b").innerHTML = `"<span class="stand-first">Finalmente</span> você conseguiu chegar até <span class="stand-b">minha moradia</span>. Seus passos até aqui não foram <span class="stand-r">fáceis</span>, não espere nenhum tipo de alívio <span class="stand-y">agora</span>..."`;
    document.getElementById("msg8c").innerHTML = `<span class="stand-first">${boss.nome}</span>, o <span class="stand-r">semeador de todo o mal</span>, <span class="stand-y">corre em sua direção</span>!`;
}


function lutarBoss() {
    document.getElementById("btnLutarBoss").disabled = true;
    document.getElementById("btnLutarBoss").classList.add("disabled-button");

    document.getElementById("exploreSEVEN").style.opacity = "0.5";

    let jogadorV = jogador.vida;
    let jogadorA = jogador.ataque;

    let bossV = boss.vida;
    let bossA = boss.ataque;

    while (jogadorV > 0 && bossV > 0) {
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

            case "eu_era_moleque":
                damageDealt = bossV;
                break;

            case "kill_all_bots":
                jogadorV -= jogadorV;
                break;

            default:
                alert("Você não sabe esse ataque! Que pena...");
                damageDealt = 0;
        }

        bossV -= damageDealt;
        alert(`Você tirou ${damageDealt} pontos de vida de ${boss.nome}. Ainda restam ${bossV}!`);

        if (bossV <= 0) {
            alert(`Parabéns, ${jogador.nome}! Você derrotou ${boss.nome}!`);

            document.getElementById("eight-title").innerHTML = `o fim de ${boss.nome}`;
            document.getElementById("msg9").innerHTML = `<span class="stand-first">${jogador.nome}</span>, você se <span class="stand-b">observa</span> a <span class="stand-b">distância</span>... e quando menos <span class="stand-b">percebe</span> está onde deveria ser a entrada da <span class="stand-r">Masmorra</span>, mas <span class="stand-y">não há mais nada aqui</span> além de uma pequena colina e uma diversidade de árvores. O som da <span class="stand-b">fauna</span> se <span class="stand-b">mistura</span> com o vento que faz a <span class="stand-b">flora</span> falar em suas folhas... e você só <span class="stand-b">escuta</span>.`;

            document.getElementById("exploreEIGHTwin").style.display = "flex";

            document.getElementById("exploreEIGHTwin").scrollIntoView();

            return jogador.vida;
        }

        alert(`${boss.nome} ataca!`);

        let damageTaken;
        let ataqueInimigo = Math.random();

        if (ataqueInimigo <= 0.5) {
            damageTaken = bossA;
        } else if (ataqueInimigo <= 0.8) {
            damageTaken = bossA * 2;
        } else {
            damageTaken = bossA * 4;
        }

        jogadorV -= damageTaken;
        alert(`${boss.nome} ataca e tira ${damageTaken} pontos de vida de você. Restam ${jogadorV}`);

        if (jogadorV <= 0) {
            alert(`${boss.nome} te derrotou! Game Over.`);

            document.getElementById("eight-title-lose").innerHTML = `${boss.nome}, a eterna ameaça`;
            document.getElementById("msg9-lose").innerHTML = `<span class="stand-first">${jogador.nome}</span>, você chegou <span class="stand-y">perto</span>... <span class="stand-r">muito</span> perto.`;
            
            document.getElementById("exploreEIGHTlose").style.display = "flex";
            
            document.getElementById("exploreEIGHTlose").scrollIntoView();
            
            jogador.vida = jogadorV;

            return jogador.vida;
        }
    }
}


function final() {
    document.getElementById("exploreEIGHTwin").style.opacity = "0.5";
    document.getElementById("exploreEIGHTlose").style.opacity = "0.5";

    document.getElementById("exploreFINAL").style.display = "flex";
    document.getElementById("exploreFINAL").scrollIntoView();

    if (jogador.vida >= 1) {
        document.getElementById("btnFinal").disabled = true;
        document.getElementById("btnFinal").classList.add("disabled-button");
        document.getElementById("final-title").innerHTML = `${jogador.nome}!`;
        document.getElementById("msg10").innerHTML = `<span class="stand-first">este</span> pode ser o <span class="stand-r">fim</span> desta jornada, mas agora que você <span class="stand-b">provou</span> para si mesmo toda a <span class="stand-b">coragem</span> e <span class="stand-first">força</span> que existe dentro de você <span class="stand-r">o mundo</span> virou uma <span class="stand-y">grande oportunidade</span>!`;
        document.getElementById("msg10a").innerHTML = `<span class="stand-first">seus</span> <span class="stand-y">atributos finais</span> desta <span class="stand-b">aventura</span>:<br><br><span class="stand-r">ataque</span>::  ${jogador.ataque}<br><span class="stand-b">vida</span>::  ${jogador.vida}`;
        document.getElementById("msg10b").innerHTML = `<span class="stand-b">voa</span>, <span class="stand-y">Bruxão</span>!`;
        document.getElementById("videoFinal").setAttribute("src", "https://www.youtube.com/watch?v=ytHRxkhl638");
    } else if (jogador.vida < 1) {
        document.getElementById("pentelho").disabled = true;
        document.getElementById("pentelho").classList.add("disabled-button");
        document.getElementById("final-title").innerHTML = `${jogador.nome}...`;
        document.getElementById("msg10").innerHTML = `<span class="stand-first">lembre-se</span> de que a verdadeira <span class="stand-b">coragem</span> é a <span class="stand-b">persistência</span> em <span class="stand-r">situações adversas</span>. Um pouco de <span class="stand-b">conhecimento</span> cai bem, mas depois de tudo isso acho que você acumulou um <span class="stand-y">tanto</span> dele.`;
        document.getElementById("msg10a").innerHTML = `<span class="stand-first">seus</span> <span class="stand-y">atributos finais</span> desta <span class="stand-b">aventura</span>:<br><br><span class="stand-r">ataque</span>::  ${jogador.ataque}<br><span class="stand-b">vida</span>::  ${jogador.vida}`;
        document.getElementById("msg10b").innerHTML = `<span class="stand-b">voa</span>, <span class="stand-y">Bruxão</span>!`;
        document.getElementById("videoFinal").setAttribute("src", "https://www.youtube.com/embed/SUDQklUHCj0?si=NozCLbeBgpF4BC04");
    } else {
        return;
    }
}


function exit() {
    window.close();
}

