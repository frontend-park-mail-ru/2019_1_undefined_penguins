import Bus from '../scripts/EventBus.js';
import { EVENTS } from '../utils/events.js';

/**
	 * GameStrategy
	 * @name GameStrategy
	 * @class GameStrategy
	 */
export default class GameStrategy {
    constructor() {

        if (this.constructor.name === GameStrategy.name) {
            throw new TypeError('Can not create instance of GameStrategy');
        }

        this._subscribed = [];
        this.subscribe(EVENTS.READY_TO_START, 'readyToStart');
        this.subscribe(EVENTS.NEXT_STEP_CONTROLS_PRESSED, 'onNewCommand');
        this.subscribe(EVENTS.NEW_ROUND, 'onNewRound');

        if (navigator.onLine) {
            this.subscribe('SIGNAL_START_THE_GAME', 'onStart');
            this.subscribe('SIGNAL_NEW_GAME_STATE', 'onNewState');
            this.subscribe('SIGNAL_FINISH_GAME', 'onFinishGame');
            this.subscribe('SIGNAL_TO_WAIT_OPPONENT', 'onWaitOpponent');
            this.subscribe('SIGNAL_FINISH_ROUND', 'onFinishRound');
        }

        this.penguin = null;
        this.gun = null;
        this.state = null;
    }

    readyToStart() {
        throw new TypeError('Not implemented');
    }

    opponentFound(penguin, gun) {
        Bus.emit(EVENTS.INIT_OPPONENTS, {penguin, gun});
    }

    onFinishRound() {
        throw new TypeError('Not implemented');
    }

    startGame() {
        Bus.emit(EVENTS.START_THE_GAME);
    }

    gameOver(payload) {
        Bus.emit(EVENTS.FINISH_THE_GAME, payload);
    }

    roundOver() {
        throw new TypeError('Not implemented');
    }
    
    onNewCommand() {
        throw new TypeError('Not implemented');
    }

    onNewRound() {
        throw new TypeError('Not implemented');
    }

    onFinishGame(payload) {
        this.gameOver(payload);
    }

    onWaitOpponent() {
        throw new TypeError('Not implemented');
    }

    waitOpponent() {
        Bus.emit(EVENTS.WAITING_FOR_OPPONENT);
    }

    setNewGameState(state) {
        Bus.emit(EVENTS.SET_NEW_GAME_STATE, {state});
    }


    subscribe(event, callbackName) {
        Bus.on(event, (payload) => {
            if (callbackName && typeof this[callbackName] === 'function') {
                this[callbackName](payload);
            }
        });
        this._subscribed.push({name: event, callback: callbackName});
    }

    unsubscribe(event) {
        try {
            this._subscribed = this._subscribed.filter(data => data.name !== event);
            Bus.off(event);
        }
        catch(e) {
            // console.log(e.message);
        }
    }

    destroy() {
        // TODO: Отписаться от всех событий
        this._subscribed.forEach(data => Bus.off(data.name, data.callback));
        this._subscribed = null;
        Bus.off('ws-checked');
        Bus.emit(EVENTS.WEBSOCKET_CLOSE);
    }
}