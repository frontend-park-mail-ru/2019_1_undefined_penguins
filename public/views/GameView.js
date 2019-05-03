import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';

export default class GameView extends BaseView {
    constructor(el, mode) {
        super(el);
        this.game = null;
        this.mode = mode;
        // TODO: получить канвас
        const fishCanvas = this.el.querySelector('.game-view__canvas-fish');
        const penguinCanvas = this.el.querySelector('.game-view__canvas-penguin');
        const snowCanvas = this.el.querySelector('.game-view__canvas-snow');
        const gunCanvas = this.el.querySelector('.game-view__canvas-gun');
        this.canvases = {
            fish: fishCanvas,
            penguin: penguinCanvas,
            snow: snowCanvas,
            gun: gunCanvas,
        };
        Bus.emit('start-game', this);
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
        // TODO: ПОТОМ НОРМАЛЬНО СДЕЛАЕМ
    
    }
}
