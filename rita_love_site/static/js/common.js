document.documentElement.classList.add('js-ready');

window.addEventListener('pageshow', () => {
    document.body.classList.add('page-visible');
});

// Мягкая анимация перехода только для обычных внутренних ссылок.
document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || link.target === '_blank' || event.metaKey || event.ctrlKey) return;

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return;

    event.preventDefault();
    document.body.classList.add('page-leaving');
    setTimeout(() => {
        window.location.href = link.href;
    }, 220);
});
