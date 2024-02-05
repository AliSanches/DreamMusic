// Elementos do HTML e armazenando em variaveis
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__video');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const chekMusica = document.querySelector('#alternar-musica');
const comecarPausar = document.querySelector('.app__card-primary-butto-icon');
const timer = document.querySelector('#timer');
const checkBox = document.querySelector('.toggle-checkbox');

const comecarBt = document.querySelector('#start-pause');
const iniciarPausar = document.querySelector('#start-pause span');

// Variavel musica que vai guardar uma instancia do objeto Audio com o caminho da musica
const musica = new Audio('/sons/playboicart.mp3');
const temporizadorPlay = new Audio('/sons/play.wav');
const temporizadorPause = new Audio('/sons/pause.mp3');
const temporizadorZero = new Audio('/sons/beep.mp3');

// 25 minutos em segundos
let tempoDecorridoEmSeg = 1500;
let intervaloId = null;

// looping para não parar a musica
musica.loop = true;

    // change é um evento de verdadeiro ou falso
    chekMusica.addEventListener('change', function() {

        if(musica.paused)
        {
            musica.play();
        }
        else
        {
            musica.pause();
        }
    })

// Adicionando a uma lista de evento onde é passado uma ação e uma função
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSeg = 1500;
    otimizaContexto('foco');
    // classList. é um método que possui propriedades para adicionar/remover e mais, no caso ele esta adicionando uma classe a mais com determinadas propriedades
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSeg = 300;
    otimizaContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSeg = 900;
    otimizaContexto('descanso-longo');
    longoBt.classList.add('active');
})

// Método que recebe um valor que sera o contexto e ira executar todos os parametros com base no contexto informado
function otimizaContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    });

    // setAttribute (Define Atributo), recebe 2 parametros; primeiro é o atributo e segundo é o valor do atributo
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/videos/${contexto}.mp4`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = 'Músicas podem,<br>\
            <strong class="app__title-strong">te leva a outras dimensões.</strong>'
        break;
    
        case "descanso-curto":
            titulo.innerHTML = 'Variar um pouco pode ajudar a <strong class="app__title-strong"> relaxar ainda mais!</strong>'
        break;

        case "descanso-longo":
            titulo.innerHTML = 'Trazendo emoções<strong class="app__title-strong"> e nostalgia.</strong>'
        break;

        default:
        break;
    }
}

const contagemRegressiva = () => {

    if(tempoDecorridoEmSeg <= 0)
    {
        zerar();
        // temporizadorZero.play();
        alert('Tempo finalizado!');

        return;
    }
    // decrementando um valor em javascript
    tempoDecorridoEmSeg -= 1;
    mostrarTempo();
}

comecarBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {

    if(intervaloId) {
        temporizadorPause.play();
        zerar();
        return;
    }

    temporizadorPlay.play();
    iniciarPausar.innerHTML = 'Pausar';
    comecarPausar.setAttribute('src', '/imagens/pause.png');

    /* setInterval recebe 2 parametro, o primeiro é o método a ser executado e o segundo o tempo em que vai ser executado */
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {

    iniciarPausar.innerHTML = 'Começar';
    comecarPausar.setAttribute('src', '/imagens/play_arrow.png');

    // clearInterval interrompe o intervalo
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo() {

    const tempo = new Date(tempoDecorridoEmSeg * 1000);
    
    // toLocaleString método padrão do objeto Date para formatar data
    const tempoForm = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = tempoForm;
}

mostrarTempo()