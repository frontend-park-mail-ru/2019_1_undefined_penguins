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

        this.subscribe(EVENTS.READY_TO_START, 'readyToStart');
        // this.subscribe(EVENTS.NEXT_STEP_CONTROLS_PRESSED, 'onNewCommand');
        this.me = null;
        this.opponent = null;
        this.state = null;
    }

    readyToStart(payload) {
        console.log('GameStrategy.fn.onLoggedIn', arguments);
        throw new TypeError('Not implemented');
    }

    opponentFound(me, opponent) {
        console.log('GameStrategy.fn.fireOpponentFound', arguments);
        Bus.emit(EVENTS.INIT_OPPONENTS, {me, opponent});
    }

    startGame() {
        console.log('GameStrategy.fn.fireStartGame', arguments);
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
        console.log('GameStrategy.fn.fireWaitOpponent', arguments);
        mediator.emit(EVENTS.WAITING_FOR_OPPONENT);
    }

    setNewGameState(state) {
        console.log('GameStrategy.fn.setNewGameState', arguments);
        Bus.emit(EVENTS.SET_NEW_GAME_STATE, {state});
    }


    subscribe(event, callbackName) {
        Bus.on(event, function (payload) {
            if (callbackName && typeof this[callbackName] === 'function') {
                this[callbackName](payload);
            }
            console.log('subscribed: ', event, callbackName);
        }.bind(this));
    }

    // unsubscribe(event) {
    // 	this._subscribed = this._subscribed.filter(data => data.name !== event);
    // 	mediator.off(event, this.mediatorCallback);
    // }

    destroy() {
        // TODO: Отписаться от всех событий
    }
}