import GameStrategy from '../GameStrategy.js';
// import { EVENTS } from '../../utils/events.js';
import WS from '../../modules/WebSocket.js';
// import Bus from '../../scripts/EventBus.js';

export default class MultiPlayerStrategy extends GameStrategy {
    constructor() {
        console.log('MultiPlayerStrategy.fn');
        super();
        this.ws = new WS('multi');
    }

    onStart(payload) {
        console.log('MultiPlayerStrategy.fn.onStart');
        console.dir(payload);
        let state = {
            penguin: {
                alpha: payload.penguin.alpha,
                clockwise: payload.penguin.clockwise,
            },
            piscesAngles:[],
            gun: {
                bullet: {
                    distance_from_center: payload.gun.bullet.distance_from_center,
                    alpha: payload.gun.bullet.alpha,
                },
                alpha: payload.gun.alpha,
            }
        };
        for (let i = 0; i < payload.PiscesCount; i++) {
            state.piscesAngles.push((360/payload.PiscesCount)*i);
        }
        console.log(payload.penguin.name, payload.gun.name);
        this.opponentFound(payload.penguin.name, payload.gun.name);
        this.onNewState(state);
        this.startGame();
    }

    onNewState(state) {
        this.state = state;

        this.setNewGameState(this.state);
    }

    onFinishGame(payload) {
        this.gameOver(payload);
    }

    onFinishRound(payload) {
        this.roundOver(payload);
    }

    onWaitOpponent() {
        this.waitOpponent();
    }

    readyToStart(payload) {
        console.log('MultiPlayerStrategy.fn.readyToStart', arguments);

        this.waitOpponent();
        this.ws.send('newPlayer', { name: payload.username, mode: 'MULTI' });
    }

    onNewCommand(payload) {
        console.log('MultiPlayerStrategy.fn.onNewCommand');
        // TODO: init penguin and gun
        this.ws.send('newCommand', { name: payload.username, mode: 'MULTI' });
    }

    onNewRound(payload) {
        console.log('MultiPlayerStrategy.fn.onNewRound');
        // TODO: init penguin and gun
        this.ws.send('newRound', { name: payload.username, mode: 'MULTI' });
    }
}