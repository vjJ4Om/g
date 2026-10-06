document.querySelectorAll('.moment-card').forEach((card) => {
    const media = card.querySelector('.moment-media');
    const button = card.querySelector('.moment-description-button');
    const description = card.querySelector('.moment-description');

    const revealButton = () => {
        button.hidden = false;
        card.classList.add('is-selected');
    };

    media.addEventListener('click', revealButton);
    media.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            revealButton();
        }
    });

    button.addEventListener('click', () => {
        const opening = description.hidden;
        description.hidden = !opening;
        card.classList.toggle('is-open', opening);
        if (opening) description.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});
