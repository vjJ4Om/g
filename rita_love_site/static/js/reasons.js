const reasons = JSON.parse(document.getElementById('reasonsData').textContent);
const giftBox = document.getElementById('giftBox');
const note = document.getElementById('reasonNote');
const noteNumber = document.getElementById('reasonNumber');
const noteText = document.getElementById('reasonText');
const nextButton = document.getElementById('nextReason');
const finish = document.getElementById('reasonsFinish');
const stage = document.getElementById('giftStage');

let index = -1;
let busy = false;

function showReason(nextIndex) {
    if (busy || nextIndex >= reasons.length) return;
    busy = true;
    index = nextIndex;

    giftBox.classList.add('open');
    note.hidden = false;
    noteNumber.textContent = `Причина № ${index + 1}`;
    noteText.textContent = reasons[index];

    requestAnimationFrame(() => {
        note.classList.add('note-visible');
    });

    nextButton.hidden = false;
    nextButton.textContent = index === reasons.length - 1 ? 'Закрыть последнюю записку' : 'Ещё одну';

    setTimeout(() => { busy = false; }, 650);
}

function closeCurrentThenContinue() {
    if (busy || index < 0) return;
    busy = true;
    note.classList.remove('note-visible');
    note.classList.add('note-returning');
    giftBox.classList.remove('open');

    setTimeout(() => {
        note.classList.remove('note-returning');
        note.hidden = true;

        if (index >= reasons.length - 1) {
            nextButton.hidden = true;
            giftBox.classList.add('finished');
            finish.hidden = false;
            requestAnimationFrame(() => finish.classList.add('finish-visible'));
            busy = false;
            return;
        }

        busy = false;
        showReason(index + 1);
    }, 700);
}

giftBox.addEventListener('click', () => {
    if (index === -1) showReason(0);
});

nextButton.addEventListener('click', closeCurrentThenContinue);
