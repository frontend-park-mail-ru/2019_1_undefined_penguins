import GameStrategy from '../GameStrategy.js';
export default class MultiPlayerStrategy extends GameStrategy {
    constructor() {
        console.log('MultiPlayerStrategy.fn');
        super();

        this.subscribe('SIGNAL_START_THE_GAME', 'onStart');
        this.subscribe('SIGNAL_NEW_GAME_STATE', 'onNewState');
        this.subscribe('SIGNAL_FINISH_GAME', 'onFinishGame');
        this.subscribe('SIGNAL_TO_WAIT_OPPONENT', 'onWaitOpponent');
    }

    onStart(payload) {
        console.dir(payload);
        // TODO: choose who is who
        this.opponentFound(payload.me, payload.opponent);
        this.startGame();
    }

    // onNewState(state) {
    //     this.state = state;

    //     this.fireSetNewGameState(this.state);
    // }

    // onFinishGame(payload) {
    //     this.fireGameOver(payload.message || 'Игра окончена');
    // }

    // onWaitOpponent() {
    //     this.fireWaitOpponent();
    // }

    // onLoggedIn(payload) {
    //     console.log('MultiPlayerStrategy.fn.onLoggedIn', arguments);
    //     this.me = payload.username;

    //     this.fireWaitOpponent();
    //     transport.send('newPlayer', {username: payload.username});
    // }

    // onNewCommand(payload) {
    //     console.log('MultiPlayerStrategy.fn.onNewCommand', payload);
    //     if (this._pressed('FIRE', payload)) {
    //         transport.send('newCommand', {code: 'FIRE'});
    //         return;
    //     }
    //     if (this._pressed('LEFT', payload)) {
    //         transport.send('newCommand', {code: 'LEFT'});
    //         return;
    //     }
    //     if (this._pressed('RIGHT', payload)) {
    //         transport.send('newCommand', {code: 'RIGHT'});
    //         return;
    //     }
    //     if (this._pressed('UP', payload)) {
    //         transport.send('newCommand', {code: 'UP'});
    //         return;
    //     }
    //     if (this._pressed('DOWN', payload)) {
    //         transport.send('newCommand', {code: 'DOWN'});
    //         return;
    //     }
    // }

    // _pressed(name, data) {
    //     return KEYS[name].some(k => data[k.toLowerCase()]);
    // }
}