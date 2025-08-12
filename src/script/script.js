const spnInterrog = document.querySelector('.interrogacao');
const spnMaior = document.querySelector('.maior');
const spnCerto = document.querySelector('.certo');
const spnMenor = document.querySelector('.menor');
const spnLose = document.querySelector('.lose');
const spnTentativas = document.querySelector('#guesses');
const msgErro = document.querySelector('.msgErro');
const inpNumber = document.querySelector('#inpPalpite');
const btnSubmit = document.querySelector('#btnSubmit');
const btnRestart = document.querySelector('#restart');
const spnChances = document.querySelector('#chances');

let resp = Math.floor(Math.random() * 100) + 1;
let chances = 10;

function desabilitarEntradas() {
    inpNumber.disabled = true;
    inpNumber.classList.add('desabilitado');
    btnSubmit.disabled = true;
    btnSubmit.classList.add('desabilitado');
}

function habilitarEntradas() {
    inpNumber.disabled = false;
    inpNumber.classList.remove('desabilitado');
    btnSubmit.disabled = false;
    btnSubmit.classList.remove('desabilitado');
}

function habilitarBtnRestart() {
    btnRestart.disabled = false;
    btnRestart.classList.remove('desabilitado');
}

function desabilitarBtnRestart() {
    btnRestart.disabled = true;
    btnRestart.classList.add('desabilitado');
}

function verificarResposta(palpite) {
    if(palpite < resp) {
        spnInterrog.classList.add('desaparece');
        spnMenor.classList.add('desaparece');
        spnMaior.classList.remove('desaparece');
    }else if(palpite > resp) {
        spnInterrog.classList.add('desaparece');
        spnMenor.classList.remove('desaparece');
        spnMaior.classList.add('desaparece');
    }else {
        spnInterrog.classList.add('desaparece');
        spnMenor.classList.add('desaparece');
        spnMaior.classList.add('desaparece');
        spnCerto.classList.remove('desaparece');
        desabilitarEntradas();
        habilitarBtnRestart();
    }

    inpNumber.value = '';
    inpNumber.focus();
}

function atualizarPalpites(palpite) {
    if(spnTentativas.textContent === "")
        spnTentativas.textContent += palpite;
    else
        spnTentativas.textContent += ` - ${palpite}`;
}

function calcularChances() {
    chances -= 1;
    spnChances.textContent = chances;

    if(chances < 1) {
        spnInterrog.classList.add('desaparece');
        spnMenor.classList.add('desaparece');
        spnMaior.classList.add('desaparece');
        spnCerto.classList.add('desaparece');
        spnLose.classList.remove('desaparece');

        desabilitarEntradas();
        habilitarBtnRestart();
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const palpite = +formData.get('palpite');

    if(palpite !== ""){
        if(palpite < 1 || palpite > 100) { 
            msgErro.textContent = "Número fora do intervalo"
            msgErro.classList.remove('esconde-msgErro');
        }else {
            if(Number.isInteger(palpite)) {
                if(!spnTentativas.textContent.includes(palpite)) {
                    verificarResposta(palpite);
                    msgErro.classList.add('esconde-msgErro');
                    
                    atualizarPalpites(palpite);
                    calcularChances();
                }else {
                    msgErro.textContent = "Tente outro valor";
                    msgErro.classList.remove('esconde-msgErro');
                }
            }else {
                msgErro.textContent = "Digite um número inteiro";
                msgErro.classList.remove('esconde-msgErro');
            }
        }
    }else {
        msgErro.textContent = "Digite um número válido";
        msgErro.classList.remove('esconde-msgErro');
    }
});

btnRestart.addEventListener('click', () => {
    spnInterrog.classList.remove('desaparece');
    spnMenor.classList.add('desaparece');
    spnMaior.classList.add('desaparece');
    spnCerto.classList.add('desaparece');
    spnLose.classList.add('desaparece');

    spnTentativas.textContent = "";
    spnChances.textContent = "10";
    resp = Math.floor(Math.random() * 100) + 1;
    chances = 10;
    
    inpNumber.focus();
    habilitarEntradas();
    desabilitarBtnRestart();
});