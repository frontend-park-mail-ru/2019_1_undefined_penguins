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
        const mainSection = document.createElement('div');
		mainSection.dataset.sectionName = 'main';
        const title = document.createElement('h1');
        title.textContent = 'Здесь будет игра в режиме Singleplayer';
        title.style = 'color: white; display: flex; align-items: center; justify-content: center; font-size: 50px;';
        mainSection.appendChild(title);
        this.el.appendChild(mainSection);

        let canvas = document.createElement('canvas');
        canvas.id = "gc";
        canvas.width = 1200;
        canvas.height = 1200;
        canvas.style.position = "absolute";
        this.el.appendChild(canvas);

        let score = document.createElement('h1');
        score.id = "score";
        this.el.appendChild(score);
        const name = new Game(arguments);
    }
}