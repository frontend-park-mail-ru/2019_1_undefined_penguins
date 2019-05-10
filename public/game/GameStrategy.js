import Bus from '../scripts/EventBus.js';
import { EVENTS } from '../utils/events.js';

/**
	 * GameStrategy
	 * @name GameStrategy
	 * @class GameStrategy
	 */
export default class GameStrategy {
    constructor() {
        console.log('GameStrategy.fn');

        if (this.constructor.name === GameStrategy.name) {
            throw new TypeError('Can not create instance of GameStrategy');
        }

        this._subscribed = [];
        this.subscribe(EVENTS.READY_TO_START, 'readyToStart');
        this.subscribe(EVENTS.NEXT_STEP_CONTROLS_PRESSED, 'onNewCommand');

        this.penguin = null;
        this.gun = null;
        this.state = null;
    }

    readyToStart(payload) {
        console.log('GameStrategy.fn.readyToStart', arguments);
        throw new TypeError('Not implemented');
    }

    opponentFound(penguin, gun) {
        console.log('GameStrategy.fn.opponentFound', arguments);
        Bus.emit(EVENTS.INIT_OPPONENTS, {penguin, gun});
    }

    startGame() {
        console.log('GameStrategy.fn.startGame', arguments);
        Bus.emit(EVENTS.START_THE_GAME);
    }

    gameOver(message) {
        console.log('GameStrategy.fn.fireGameOver', arguments);
        Bus.emit(EVENTS.FINISH_THE_GAME, {message});
    }
    
    onNewCommand(payload) {
        console.log('GameStrategy.fn.onNewCommand', arguments);
        throw new TypeError('Not implemented');
    }

    waitOpponent() {
        console.log('GameStrategy.fn.waitOpponent', arguments);
        Bus.emit(EVENTS.WAITING_FOR_OPPONENT);
    }

    setNewGameState(state) {
        console.log('GameStrategy.fn.setNewGameState', arguments);
        Bus.emit(EVENTS.SET_NEW_GAME_STATE, {state});
    }


    subscribe(event, callbackName) {
        Bus.on(event, (payload) => {
            if (callbackName && typeof this[callbackName] === 'function') {
                this[callbackName](payload);
            }
            console.log('subscribed: ', event, callbackName);
        });
        this._subscribed.push({name: event, callback: callbackName});
    }

    // unsubscribe(event) {
    // 	this._subscribed = this._subscribed.filter(data => data.name !== event);
    // 	mediator.off(event, this.mediatorCallback);
    // }

    destroy() {
        // TODO: Отписаться от всех событий
        this._subscribed.forEach(data => Bus.off(data.name, this.mediatorCallback));
        this._subscribed = null;
    }
}