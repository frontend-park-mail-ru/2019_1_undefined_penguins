import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';
import { EVENTS } from '../utils/events.js';
import GameTmpl from '../components/Game/Game.tmpl.xml';

export default class GameView extends BaseView {
    constructor(el, mode) {
        super(el);
        this.game = null;
        this.mode = mode;
        this.canvases = {};
    }

    getCanvases() {
        return this.canvases;
    }

    getMode() {
        return this.mode;
    }

    setGame(game) {
        this.game = game;
    }

    show() {
        super.show();
    }

    render() {
        this.el.innerHTML = '';
        this.el.innerHTML = GameTmpl();
        const fishCanvas = this.el.querySelector('.canvas-fish');
        const penguinCanvas = this.el.querySelector('.canvas-penguin');
        const snowCanvas = this.el.querySelector('.canvas-snow');
        const gunCanvas = this.el.querySelector('.canvas-gun');
        this.canvases = {
            fish: fishCanvas,
            penguin: penguinCanvas,
            snow: snowCanvas,
            gun: gunCanvas,
        };

        Bus.emit('start-game', this);
        const home = this.el.getElementsByClassName('js-header__home-button')[0];
        if (home !== undefined) {
            home.addEventListener('click', (event) => {
                event.preventDefault();
                Bus.emit(EVENTS.STOP_THE_GAME, {});
                Bus.emit('open-menu');
            });
        }
    }
}
