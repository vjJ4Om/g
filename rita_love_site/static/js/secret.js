const stage = document.querySelector('.secret-stage');
const answer = stage.dataset.answer.trim().toLowerCase();
const zone = document.getElementById('runawayZone');
const button = document.getElementById('runawayButton');
const modal = document.getElementById('challengeModal');
const introStep = document.getElementById('introStep');
const riddleStep = document.getElementById('riddleStep');
const successStep = document.getElementById('successStep');
const yesButton = document.getElementById('readyYes');
const noButton = document.getElementById('readyNo');
const noTease = document.getElementById('noTease');
const form = document.getElementById('riddleForm');
const input = document.getElementById('riddleInput');
const error = document.getElementById('riddleError');
const hintButton = document.getElementById('hintButton');
const hintText = document.getElementById('hintText');
const hoorayButton = document.getElementById('hoorayButton');
const reveal = document.getElementById('secretReveal');
const confettiLayer = document.getElementById('confettiLayer');

let attempts = 0;
let unlocked = false;
let moving = false;

function placeButtonRandomly() {
    const zoneRect = zone.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const padding = 14;
    const maxX = Math.max(padding, zoneRect.width - buttonRect.width - padding);
    const maxY = Math.max(padding, zoneRect.height - buttonRect.height - padding);

    const x = padding + Math.random() * Math.max(1, maxX - padding);
    const y = padding + Math.random() * Math.max(1, maxY - padding);

    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    button.style.transform = 'none';
}

function openChallenge() {
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('modal-visible'));
}

function evade(event) {
    if (unlocked || attempts >= 3 || moving) return;
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    moving = true;
    attempts += 1;
    button.classList.add('escaping');
    placeButtonRandomly();

    setTimeout(() => {
        button.classList.remove('escaping');
        moving = false;
        if (attempts >= 3) {
            button.disabled = true;
            openChallenge();
        }
    }, 260);
}

button.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') evade(event);
});
button.addEventListener('pointerdown', evade);

button.addEventListener('click', () => {
    if (!unlocked) return;
    zone.hidden = true;
    reveal.hidden = false;
    requestAnimationFrame(() => reveal.classList.add('secret-visible'));
});

noButton.addEventListener('click', () => {
    noTease.hidden = false;
});

yesButton.addEventListener('click', () => {
    introStep.hidden = true;
    riddleStep.hidden = false;
    setTimeout(() => input.focus(), 50);
});

hintButton.addEventListener('click', () => {
    hintText.hidden = false;
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const normalized = input.value.trim().toLowerCase();

    if (normalized !== answer) {
        error.hidden = false;
        hintButton.hidden = false;
        input.classList.remove('wrong');
        void input.offsetWidth;
        input.classList.add('wrong');
        return;
    }

    riddleStep.hidden = true;
    successStep.hidden = false;
    launchConfetti();
});

hoorayButton.addEventListener('click', () => {
    modal.classList.remove('modal-visible');
    setTimeout(() => {
        modal.hidden = true;
        unlocked = true;
        button.disabled = false;
        button.classList.add('unlocked');
        button.style.left = '50%';
        button.style.top = '50%';
        button.style.transform = 'translate(-50%, -50%)';
        button.textContent = 'Посмотреть';
    }, 220);
});

function launchConfetti() {
    confettiLayer.innerHTML = '';
    const symbols = ['❤', '★', '●', '◆', '✦'];

    for (let i = 0; i < 70; i += 1) {
        const piece = document.createElement('span');
        piece.className = 'confetti-piece';
        piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.animationDelay = `${Math.random() * 0.35}s`;
        piece.style.animationDuration = `${1.6 + Math.random() * 1.4}s`;
        piece.style.setProperty('--drift', `${-90 + Math.random() * 180}px`);
        confettiLayer.appendChild(piece);
    }

    setTimeout(() => { confettiLayer.innerHTML = ''; }, 3500);
}
