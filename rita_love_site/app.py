from flask import Flask, render_template
from data import (
    SITE,
    SIX_MONTHS_MEMORIES,
    BEST_MOMENTS,
    LETTER_PARAGRAPHS,
    REASONS,
)

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html', site=SITE)


@app.route('/six-months')
def six_months():
    return render_template(
        'six_months.html',
        site=SITE,
        memories=SIX_MONTHS_MEMORIES,
    )


@app.route('/best-moments')
def best_moments():
    return render_template(
        'best_moments.html',
        site=SITE,
        moments=BEST_MOMENTS,
    )


@app.route('/timer')
def timer_page():
    return render_template('timer.html', site=SITE)


@app.route('/letter')
def letter():
    return render_template(
        'letter.html',
        site=SITE,
        paragraphs=LETTER_PARAGRAPHS,
    )


@app.route('/reasons')
def reasons():
    return render_template(
        'reasons.html',
        site=SITE,
        reasons=REASONS,
    )


@app.route('/secret')
def secret():
    return render_template('secret.html', site=SITE)


if __name__ == '__main__':
    # host=0.0.0.0 позволяет открыть сайт с телефона,
    # если телефон и компьютер находятся в одной Wi‑Fi сети.
    app.run(host='0.0.0.0', port=5001, debug=True)
