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

    fireOpponentFound(me, opponent) {
        console.log('GameStrategy.fn.fireOpponentFound', arguments);
        Bus.emit(EVENTS.INIT_OPPONENTS, {me, opponent});
    }

    // onNewCommand(payload) {
    // 	console.log('GameStrategy.fn.onNewCommand', arguments);
    // 	throw new TypeError('Not implemented');
    // }


    // fireGameOver(message) {
    // 	console.log('GameStrategy.fn.fireGameOver', arguments);
    // 	mediator.emit(EVENTS.FINISH_THE_GAME, {message});
    // }

    // fireWaitOpponent() {
    // 	console.log('GameStrategy.fn.fireWaitOpponent', arguments);
    // 	mediator.emit(EVENTS.WAITING_FOR_OPPONENT);
    // }

    // fireOpponentFound(me, opponent) {
    // 	console.log('GameStrategy.fn.fireOpponentFound', arguments);
    // 	mediator.emit(EVENTS.SETUP_OPPONENTS, {me, opponent});
    // }

    // fireStartGame() {
    // 	console.log('GameStrategy.fn.fireStartGame', arguments);
    // 	mediator.emit(EVENTS.START_THE_GAME);
    // }

    // fireSetNewGameState(state) {
    // 	// console.log('GameStrategy.fn.fireSetNewGameState', arguments);
    // 	mediator.emit(EVENTS.SET_NEW_GAME_STATE, {state});
    // }


    // subscribe(event, callbackName) {
    // 	this._subscribed.push({name: event, callback: callbackName});
    // 	mediator.on(event, this.mediatorCallback);
    // }

    // unsubscribe(event) {
    // 	this._subscribed = this._subscribed.filter(data => data.name !== event);
    // 	mediator.off(event, this.mediatorCallback);
    // }

    // destroy() {
    // 	this._subscribed.forEach(data => mediator.off(data.name, this.mediatorCallback));
    // 	this._subscribed = null;

    // }
}