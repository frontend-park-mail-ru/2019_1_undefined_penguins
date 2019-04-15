import BaseView from './BaseView.js';
import Game from '../game/Game.js';

export default class SingleplayerView extends BaseView {
    constructor(el) {
        super(el);
    }

    show() {
        super.show();
    }

    render() {
        this.el.innerHTML = '';
        // TODO: ПОТОМ НОРМАЛЬНО СДЕЛАЕМ

        let canvas = document.createElement('canvas');
        canvas.id = "gc";
        canvas.width = 600;
        canvas.height = 600;
        canvas.style.position = "absolute";
        this.el.appendChild(canvas);

        let score = document.createElement('h1');
        score.id = "score";
        score.style = 'color: white; display: flex; align-items: center; justify-content: center; font-size: 50px;';
        this.el.appendChild(score);
        const name = new Game(arguments);
    }
}