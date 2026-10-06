const stage = document.querySelector('.time-stage');
const start = new Date(stage.dataset.startDate);

const units = {
    years: document.getElementById('years'),
    months: document.getElementById('months'),
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
};

function addYears(date, years) {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
}

function addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

function calendarDifference(from, to) {
    if (to < from) {
        return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    let years = to.getFullYear() - from.getFullYear();
    let cursor = addYears(from, years);
    if (cursor > to) {
        years -= 1;
        cursor = addYears(from, years);
    }

    let months = (to.getFullYear() - cursor.getFullYear()) * 12 + (to.getMonth() - cursor.getMonth());
    let monthCursor = addMonths(cursor, months);
    if (monthCursor > to) {
        months -= 1;
        monthCursor = addMonths(cursor, months);
    }

    let remaining = to - monthCursor;
    const days = Math.floor(remaining / 86400000);
    remaining -= days * 86400000;
    const hours = Math.floor(remaining / 3600000);
    remaining -= hours * 3600000;
    const minutes = Math.floor(remaining / 60000);
    remaining -= minutes * 60000;
    const seconds = Math.floor(remaining / 1000);

    return { years, months, days, hours, minutes, seconds };
}

function animateValue(element, value) {
    const text = String(value).padStart(2, '0');
    if (element.textContent === text) return;
    element.textContent = text;
    const box = element.closest('.time-unit');
    box.classList.remove('tick');
    void box.offsetWidth;
    box.classList.add('tick');
}

function updateRelationshipTimer() {
    const diff = calendarDifference(start, new Date());
    Object.entries(diff).forEach(([key, value]) => animateValue(units[key], value));
}

function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
    const minutes = now.getMinutes() + seconds / 60;
    const hours = (now.getHours() % 12) + minutes / 60;

    document.getElementById('secondHand').style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;
    document.getElementById('minuteHand').style.transform = `translateX(-50%) rotate(${minutes * 6}deg)`;
    document.getElementById('hourHand').style.transform = `translateX(-50%) rotate(${hours * 30}deg)`;

    requestAnimationFrame(updateClock);
}

updateRelationshipTimer();
setInterval(updateRelationshipTimer, 1000);
requestAnimationFrame(updateClock);
