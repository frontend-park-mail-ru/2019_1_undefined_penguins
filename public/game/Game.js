import GameStrategy from './GameStrategy.js';
import GameManager from './GameManager.js';

export default class Game {
    /**
	* @param {GameStrategy} Strategy - реализация игровой стратегии
	* @param {String} username - имя первого пользователя
	* @param {String: {CanvasElement}} canvases - canvases-игрового поля
	*/
    constructor(Strategy, username, canvases) {
        console.log('Game.fn');
        if (!(Strategy.prototype instanceof GameStrategy)) {
            throw new TypeError('Strategy is not a GameStrategy');
        }

        this.username = username;
        this.canvases = canvases;

        this.manager = new GameManager(this.username, this.canvases, Strategy);
    }

    destroy() {
        console.log('Game.DESTROY');
        this.manager.destroy();
        this.manager = null;
    }
}
