import BaseView from './BaseView.js';
import Game from '../game/Game.js';

export default class SingleplayerView extends BaseView {
    constructor (el) {
        super(el);
    }

    show () {
        super.show();
    }

    render () {
        this.el.innerHTML = '';
        // TODO: ПОТОМ НОРМАЛЬНО СДЕЛАЕМ

        const gameField = document.createElement('div');
        gameField.classList.add('game-view__game-field');

        const score = document.createElement('h1');
        score.id = 'score';
        score.classList.add('game-view__score-element');
        gameField.appendChild(score);

        const canvas = document.createElement('canvas');
        canvas.id = 'gc';
        canvas.width = 800;
        canvas.height = 800;
        gameField.appendChild(canvas);
        this.el.appendChild(gameField);

        const name = new Game(arguments);
    }
}
