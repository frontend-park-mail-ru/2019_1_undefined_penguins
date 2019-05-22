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
        this.subscribe(EVENTS.NEW_ROUND, 'onNewRound');

        // if (navigator.onLine) {
            this.subscribe('SIGNAL_START_THE_GAME', 'onStart');
            this.subscribe('SIGNAL_NEW_GAME_STATE', 'onNewState');
            this.subscribe('SIGNAL_FINISH_GAME', 'onFinishGame');
            this.subscribe('SIGNAL_TO_WAIT_OPPONENT', 'onWaitOpponent');
            this.subscribe('SIGNAL_FINISH_ROUND', 'onFinishRound');
        // }

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
        console.log(penguin, gun);
        Bus.emit(EVENTS.INIT_OPPONENTS, {penguin, gun});
    }

    startGame() {
        console.log('GameStrategy.fn.startGame', arguments);
        Bus.emit(EVENTS.START_THE_GAME);
    }

    gameOver(payload) {
        console.log('GameStrategy.fn.gameOver', arguments);
        Bus.emit(EVENTS.FINISH_THE_GAME, payload);
    }

    roundOver(payload) {
        console.log('GameStrategy.fn.roundOver', arguments);
        Bus.emit(EVENTS.FINISH_THE_ROUND, payload);
    }
    
    onNewCommand(payload) {
        console.log('GameStrategy.fn.onNewCommand', arguments);
        throw new TypeError('Not implemented');
    }

    onNewRound(payload) {
        console.log('GameStrategy.fn.onNewRound', arguments);
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

    unsubscribe(event) {
        console.error('UNSUBSCRIBE', event);
        this._subscribed = this._subscribed.filter(data => data.name !== event);
        Bus.off(event);
    }

    destroy() {
        // TODO: Отписаться от всех событий
        this._subscribed.forEach(data => Bus.off(data.name, data.callback));
        this._subscribed = null;
        Bus.emit(EVENTS.WEBSOCKET_CLOSE);
    }
}