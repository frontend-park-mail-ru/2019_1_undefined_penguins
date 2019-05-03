import GameStrategy from './GameStrategy.js';
import GameManager from './GameManager.js';

export default class Game {
    /**
	* @param {GameStrategy} Strategy - реализация игровой стратегии
	* @param {String} username - имя первого пользователя
	* @param {CanvasElement} canvas - canvas-игрового поля
	*/
    constructor(Strategy, username, canvas) {
        console.log('Game.fn');
        if (!(Strategy.prototype instanceof GameStrategy)) {
            throw new TypeError('Strategy is not a GameStrategy');
        }

        this.username = username;
        this.canvas = canvas;

        this.manager = new GameManager(this.username, this.canvas, Strategy);
    }

    destroy() {
        console.log('Game.DESTROY');
        this.manager.destroy();
        this.manager = null;
    }
}
