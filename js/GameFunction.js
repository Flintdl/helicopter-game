// Declarações de const static
const container = document.querySelector(".container");
const sizes = document.querySelector(".sizes");
const body = document.querySelector("body");
const floorGame = document.querySelector(".heliponto");
const rain = document.querySelector(".rain.front-row");
// ------- Fim

// Dialogs
const winGame = document.querySelector("#dialog-win");
const dialogHelp = document.querySelector("#dialog-help");
const maskDialog = document.querySelector("#mask-dialog");
const closeDialog = document.querySelector("#close-button-dialog");
const DialogCopyRight = document.querySelector("#dialog-copyright");
// CloseDialogs
const closeDialogWin = document.querySelector("#close-button-dialog-win");
const closeDialogCopyRight = document.querySelector("#close-button-dialog-copyright");
// ------- Fim

// Efeitos Sound
const sound = document.querySelector("#myAudio");
const soundStart = document.querySelector("#soundStart");
const introEffect = document.querySelector("#introEffect");
const shootSound = document.querySelector("#shootSound");
const deathMob = document.querySelector("#deathMob");
const winGameSound = document.querySelector("#winGameSound");
const musicThemeSound = document.querySelector("#musicthemestart");
const musicThemeRound1Sound = document.querySelector("#musicthemeround1");
// ------- Fim

// Containers
const containerStart = document.querySelector("#container-start");
const buttonStart = document.querySelector("#start-button");
// ------- Fim

// Espaço para Declarar (Declarando) um objeto com estrutura JSON

// var usuario, pontuacao, rounds;
// submit = document.querySelector("#submit");
// submit.addEventListener("click", (e) => {
//     console.log("foi 2");
//     usuario = document.querySelector("#usuario").value;
//     pontuacao = document.querySelector("#pontuacao").value;
//     rounds = document.querySelector("#rounds").value;
//     const json = { usuario, pontuacao, rounds };
//     console.log(json);
//     $.post("http://localhost:8089/usuarios", json, function () {
//     });
// });

// ------- Fim
var objUsuario = { usuario: '', pontuacao: 0, rounds: 0 };

window.onload = function() {

    var usuario;
    submit = document.querySelector("#submit");
    submit.addEventListener("click", (e) => {
        usuario = document.querySelector("#usuario").value;
        $.get(`http://localhost:8089/usuarios/${usuario}`, function(data) {
            console.log(data);
            if (data) {
                objUsuario = data;
                console.log("Esse usuario já existe " + data.usuario);
            } else {
                objUsuario.usuario = usuario
                $.post("http://localhost:8089/usuarios", objUsuario, function() {});
            }
        });
    });

    getUsuario = document.querySelector("#getUsuario");
    getUsuario.addEventListener("click", (e) => {
        usuario = document.querySelector("#get-usuario").value;
        $.get(`http://localhost:8089/usuarios/${usuario}`, function(data) {
            console.log(data);
            if (data) {
                objUsuario = data;
                console.log("Você logou como " + data.usuario);
            } else {
                console.log("Esse usuario não existe");
            }
        });
    });

    // Faz os efeitos de chuva na tela inicial
    var makeItRain = function() {
        rain.innerHTML = "";
        var increment = 0;
        var drops = document.createElement('div');

        while (increment < 100) {
            var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
            var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));

            increment += randoFiver;

            const drop = document.createElement('div');
            drop.classList.add('drop')
            drop.style = `left: ${increment}%; bottom: ${randoFiver + randoFiver - 1 + 100}%; animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;`;

            const stem = document.createElement('div');
            stem.classList.add('stem')
            stem.style = `animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;`;

            const splat = document.createElement('div');
            splat.classList.add('splat')
            splat.style = `animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;`;

            drop.appendChild(stem);
            drop.appendChild(splat);
            drops.appendChild(drop);
        }
        rain.appendChild(drops);
    }
    makeItRain();
    // ------- Fim

    // Fecha Diálog de copyright e faz aparecer os botões Start e TopScore
    closeDialogCopyRight.addEventListener("click", (e) => {
        maskDialog.style.display = "none";
        DialogCopyRight.style.display = "none";
        introEffect.play();
        musicThemeSound.play();
        containerStart.style.display = "block";
        DialogCopyRight.remove(DialogCopyRight);
    });
    // ------- Fim

    // Botão de click Start onde possibilita a execução de todos os outros códigos
    buttonStart.addEventListener("click", (e) => {

        // Remove a chuva, adiciona a classe start-game e para o som de inicio
        rain.remove(rain);
        buttonStart.classList.toggle("start-game");
        soundStart.play();
        // ------- Fim

        // Fala do personagem Woff com animação de texto escrito
        dialogHelp.style.display = "block";

        var contentWoff = 'Woff... Sou o Woff e preciso de sua ajuda, varios gatos alienigenas estao invadindo nosso campo, voce precisa elimina-los, posso contar com sua ajuda ?';
        var textWoff = document.querySelector('#textWoff');

        function escrever(str, el) {
            var char = str.split('').reverse();
            var typer = setInterval(function() {
                if (!char.length) return clearInterval(typer);
                var next = char.pop();
                el.innerHTML += next;
            }, 40);
        }
        escrever(contentWoff, textWoff);

        setTimeout(function() {
            closeDialog.style.display = "block";
        }, 0); // 6500
        // ------- Fim

        // Adiciona o Background de Round 1
        body.style.background = "url('img/background-progress.png')";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundSize = "cover";
        body.style.cursor = "crosshair";
        // ------- Fim

        // Se contém a Classe start-game ele executa as funções a seguir
        if (buttonStart.classList.contains("start-game")) {

            // Inicia o som de tema Round 1
            musicThemeRound1Sound.play();
            // ------- Fim

            // Cria três corações de vida para o personagem
            var heartCount = 0;
            while (heartCount < 3) {
                const heartCharacter = document.createElement('span');
                heartCharacter.classList.add('heart');
                heartCharacter.classList.add('life-count');
                document.body.appendChild(heartCharacter);
                heartCount++;
                if (heartCount == 2) {
                    heartCharacter.style.right = "84px";
                }
                if (heartCount == 3) {
                    heartCharacter.style.right = "136px";
                }
            }
            // ------- Fim

            // Pausa a música de intro e o efeito de chuva e esconde o container de botões de Start e TopScore
            introEffect.pause();
            musicThemeSound.pause();
            containerStart.style.transition = "opacity .25s linear";
            containerStart.style.opacity = "0";

            setTimeout(function() {
                containerStart.remove(DialogCopyRight);
            }, 1100);
            // ------- Fim

            // Ação de fechar diálog do personagem Woff e executar as funções a seguir
            closeDialog.addEventListener("click", (e) => {

                // Remove o Dialogo do Woff e adiciona div de chão ao mapa
                dialogHelp.remove(DialogCopyRight);
                floorGame.style.display = "block";
                // ------- Fim

                // Cria o personagem e atribue as classes/tamanhos/posições
                var character = document.createElement('span');
                character.setAttribute('class', 'character-person');
                document.body.appendChild(character);
                var sizeCharacter = "120";

                var yPosition = floorGame.offsetTop;
                character.style.left = 0 + "%";
                character.style.top = yPosition + -120 + "px";

                character.style.width = sizeCharacter + 'px';
                character.style.height = sizeCharacter + 'px';
                // ------- Fim

                // Chama as Funções de mover o personagem
                body.addEventListener("keydown", (e) => {
                    body.addEventListener("keydown", moveCharacter);
                    return;
                });
                // ------- Fim

                // Função de Mover o personagem
                const moveCharacter = e => {
                        const characterMove = document.querySelector(".character-person");
                        var i;
                        mobSpawnAll = document.querySelectorAll(".mob-npc");
                        mobSpawn = document.querySelector(".mob-npc");

                        // Função ação tecla Direita
                        function rightArrowPressed() {
                            characterMove.style.left = parseInt(characterMove.style.left) + 20 + 'px';
                            character.style.transform = `rotateY(0deg)`
                            mobSpawnAll = document.querySelectorAll(".mob-npc");
                            allMobs();
                            if (characterMove.offsetLeft + 100 > window.innerWidth) {
                                leftArrowPressed();
                                character.style.transform = `rotateY(0deg)`;
                            }
                        }
                        // ------- Fim

                        // Função ação tecla Esquerda
                        function leftArrowPressed() {
                            characterMove.style.left = parseInt(characterMove.style.left) - 20 + 'px';
                            character.style.transform = `rotateY(180deg)`;
                            allMobs();

                            if (characterMove.offsetLeft < 0) {
                                character.style.left = `0`;
                            }
                        }
                        // ------- Fim

                        // Função ação tecla Cima
                        function upArrowPressed() {
                            var yPosition = floorGame.offsetTop;
                            characterMove.style.top = parseInt(characterMove.style.top) - 200 + 'px';
                            characterMove.style.transition = "top .25s linear";
                            setTimeout(function() {
                                characterMove.style.top = yPosition + -120 + 'px';
                            }, 200);
                        }
                        // ------- Fim

                        // Cases definidos Staticamente que fazem as ações do personagem
                        switch (e.keyCode) {
                            case 37:
                                leftArrowPressed();
                                break;
                            case 39:
                                rightArrowPressed();
                                break;
                            case 38:
                                upArrowPressed();
                                break;
                        }
                        // ------- Fim

                        // Faz com que os Mobs andem em direção ao personagem e tira os corações caso ataca-lo
                        function allMobs() {
                            for (i = 0; i < mobSpawnAll.length; i++) {
                                mobSpawnAll[i].style.transition = "left 2.25s linear";
                                mobSpawnAll[i].style.left = character.offsetLeft + "px";

                                if (mobSpawnAll[i].offsetLeft == character.offsetLeft) {
                                    const heartCharacter = document.querySelectorAll('.heart');

                                    for (var heartOpacity = 0; heartOpacity < heartCharacter.length; heartOpacity++) {
                                        const itematual = heartCharacter[heartOpacity];

                                        // Tira a classe life-count e adiciona opacidade para a vida perdida chegando a 0 dando game over
                                        if (itematual.classList.contains('life-count')) {
                                            itematual.classList.add('opacity-heart');
                                            itematual.classList.remove('life-count');
                                            if (heartOpacity === (heartCharacter.length - 1)) {
                                                console.log('Morreu perdeu, pau no c* do abreu');
                                            }
                                            return;
                                        }
                                        // ------- Fim
                                    }
                                }
                            }
                        }
                        // ------- Fim

                        // Alterna direção do Mob de acordo com a posição do Personagem
                        if (mobSpawn.offsetLeft > character.offsetLeft) {
                            for (i = 0; i < mobSpawnAll.length; i++) {
                                mobSpawnAll[i].style.transform = `rotateY(180deg)`
                            }
                        } else {
                            for (i = 0; i < mobSpawnAll.length; i++) {
                                mobSpawnAll[i].style.transform = `rotateY(0deg)`
                            }
                        }
                        // ------- Fim

                    }
                    // ------- Fim

                // Função de atirar do personagem e matar mobs
                setTimeout(function() {
                    body.addEventListener("click", (e) => {
                        shootSound.play();
                        shootSound.volume = 0.5;
                        const shooter = document.createElement('span');
                        shooter.style.top = 4 + 'px';
                        shooter.style.left = 160 + 'px';
                        shooter.style.transition = 'all .35s';
                        shooter.classList.add('bullet')

                        setTimeout(function() {
                            shooter.style.left = 5000 + '%';
                        }, 50);

                        character.appendChild(shooter);

                        killMobShooting();

                        setTimeout(function() {
                            shootSound.pause();
                            shootSound.currentTime = 0;
                        }, 300);
                        setTimeout(function() {
                            shooter.remove(shooter);
                        }, 800);
                    });
                }, 200);
                // ------- Fim

                // Função Spawnar mobs com posições aleatorias e função de mata-los
                var mobSpawnCount = 0;
                while (mobSpawnCount < 5) {
                    // Criação do mob quando startado o game
                    const mobSpawn = document.createElement('span');
                    mobSpawn.setAttribute('class', 'mob-npc');
                    document.body.appendChild(mobSpawn);
                    // ------- Fim

                    // Definição de tamanho do mob e sua posição
                    mobSpawn.style.width = 100 + "px";
                    mobSpawn.style.height = 100 + "px";
                    mobSpawn.style.top = floorGame.offsetTop - 100 + "px";
                    // ------- Fim

                    // Função que define posição aleatoria aos mobs
                    if (mobSpawnCount < 5, mobSpawnCount++) {
                        var tLeft = Math.floor(Math.random() * (window.innerWidth) + 0)
                            // tTop = Math.floor(Math.random() * (window.innerHeight) + 50);
                        mobSpawn.style.left = tLeft + "px";
                    };
                    // ------- Fim

                    countPontuacao = 0;
                    mobSpawnCount = mobSpawnCount;

                    function killMobShooting() {
                        // Declarações de posições e tamanhos da bala e do mob
                        const shooterPassPos = document.querySelector(".bullet");
                        shooterPassPos.offsetTop;
                        const shooterPassHei = document.querySelector(".bullet");
                        shooterPassHei.height;
                        const mobSpawnHei = document.querySelector(".mob-npc");
                        mobSpawnHei.height;
                        const mobSpawnTest = document.querySelector(".mob-npc");
                        mobSpawnTest.length;
                        // ------- Fim

                        // Função que faz o mob morrer e sumir e mudar a cor e ativar o som indicando que foi baleado
                        if (shooterPassPos + shooterPassHei > mobSpawnHei) {
                            mobSpawnTest.style.filter = "invert(1)";
                            deathMob.play();
                            setTimeout(function() {
                                mobSpawnCount--;
                                mobSpawnTest.remove(mobSpawnTest);
                                deathMob.pause();
                                deathMob.currentTime = 0;

                                if (objUsuario) {
                                    pontuacao = objUsuario.pontuacao = objUsuario.pontuacao + 1;
                                    usuario = objUsuario;
                                    console.log(objUsuario);

                                } else {
                                    $.get(`http://localhost:8089/usuarios/${usuario}`, function(data) {
                                        objUsuario = data;
                                        objUsuario.pontuacao = objUsuario.pontuacao + 1;
                                        console.log(objUsuario);
                                    });
                                    console.log(usuario);
                                }
                            }, 200);
                            if (mobSpawnCount <= 1) {
                                $.ajax({
                                    url: `http://localhost:8089/usuarios/${usuario}`,
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    type: 'POST',
                                    data: objUsuario,
                                    success: function(result) {
                                        console.log("[$ Fuuuuuuuncionou $]");
                                    },
                                    error: function() {
                                        console.log("[$ Não Fuuuuuuuncionou $]");
                                    }
                                });
                                winGameBefore();
                            }
                        } else {
                            document.location.reload(true);
                        }
                        // ------- Fim

                        // Função de jogo ganho, executado quando o número de mobs for menor ou igual a 0
                        function winGameBefore() {
                            shootSound.volume = 0;
                            shootSound.pause();
                            character.remove(character);
                            maskDialog.style.display = "block";
                            winGame.style.display = "block";
                            winGame.style.opacity = "1";
                            musicThemeRound1Sound.pause();
                            winGameSound.play();
                            closeDialogWin.addEventListener("click", (e) => {
                                soundStart.play();
                                setTimeout(function() {
                                    document.location.reload(true);
                                }, 200);
                            });
                        }
                        // ------- Fim
                    }
                };
                // ------- Fim
            });
            // ------- Fim
        }
        // ------- Fim
    });
    // ------- Fim
};