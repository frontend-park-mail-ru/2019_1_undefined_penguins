import GameStrategy from '../GameStrategy.js';
// import { EVENTS } from '../../utils/events.js';
import WS from '../../modules/WebSocket.js';
// import Bus from '../../scripts/EventBus.js';

export default class MultiPlayerStrategy extends GameStrategy {
    constructor() {
        console.log('MultiPlayerStrategy.fn');
        super();
        this.ws = new WS('multi');

        this.subscribe('SIGNAL_START_THE_GAME', 'onStart');
        this.subscribe('SIGNAL_NEW_GAME_STATE', 'onNewState');
        this.subscribe('SIGNAL_FINISH_GAME', 'onFinishGame');
        this.subscribe('SIGNAL_TO_WAIT_OPPONENT', 'onWaitOpponent');
    }

    onStart(payload) {
        console.log('MultiPlayerStrategy.fn.onStart');
        console.dir(payload);
        this.opponentFound(payload.penguin.name, payload.gun.name);
        this.startGame();
    }

    onNewState(state) {
        this.state = state;

        this.setNewGameState(this.state);
    }

    onFinishGame(payload) {
        this.gameOver(payload.message);
    }

    onWaitOpponent() {
        this.waitOpponent();
    }

    readyToStart(payload) {
        console.log('MultiPlayerStrategy.fn.readyToStart', arguments);

        this.waitOpponent();
        this.ws.send('newPlayer', {name: payload.username, mode: 'MULTI' });
    }

    onNewCommand(payload) {
        console.log('MultiPlayerStrategy.fn.onNewCommand', payload);
        // TODO: init penguin and gun
        this.ws.send('newCommand', {code: payload});
    }
}