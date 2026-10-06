const cards = [...document.querySelectorAll('.memory-card')];
const nextButton = document.getElementById('sixMonthsNext');
const hint = document.getElementById('readHint');
const storageKey = 'rita-six-months-read';

let readItems = new Set();

try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    readItems = new Set(saved.map(String));
} catch (_) {
    readItems = new Set();
}

function saveProgress() {
    sessionStorage.setItem(storageKey, JSON.stringify([...readItems]));
}

function updateGate() {
    const remaining = cards.length - readItems.size;
    if (remaining <= 0) {
        nextButton.disabled = false;
        hint.textContent = 'Ты прочитала все описания ❤️';
        hint.classList.add('complete');
    } else {
        nextButton.disabled = true;
        hint.textContent = `Нажми на фотографию и прочитай описание. Осталось: ${remaining}`;
        hint.classList.remove('complete');
    }
}

cards.forEach((card) => {
    const id = card.dataset.memoryId;
    const media = card.querySelector('.media-tap');
    const actions = card.querySelector('.memory-actions');
    const button = card.querySelector('.show-description');
    const description = card.querySelector('.memory-description');

    function restoreReadState() {
        if (!readItems.has(id)) return;
        actions.hidden = false;
        description.hidden = false;
        card.classList.add('is-read', 'is-open');
        button.textContent = 'Описание прочитано ✓';
    }

    media.addEventListener('click', () => {
        actions.hidden = false;
        card.classList.add('is-selected');
        actions.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    button.addEventListener('click', () => {
        const isHidden = description.hidden;
        description.hidden = !isHidden;
        card.classList.toggle('is-open', isHidden);

        if (isHidden && !readItems.has(id)) {
            readItems.add(id);
            card.classList.add('is-read');
            button.textContent = 'Описание прочитано ✓';
            saveProgress();
            updateGate();
        }
    });

    restoreReadState();
});

nextButton.addEventListener('click', () => {
    if (nextButton.disabled) {
        hint.classList.remove('shake');
        void hint.offsetWidth;
        hint.classList.add('shake');
        return;
    }
    window.location.href = nextButton.dataset.nextUrl;
});

updateGate();
