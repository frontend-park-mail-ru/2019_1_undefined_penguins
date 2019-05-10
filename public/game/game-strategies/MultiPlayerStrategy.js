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
            penguinAngle: payload.penguin.alpha,
            clockwise: payload.penguin.clockwise,
            piscesAngles:[],
            bullet: {
                distanceFromCenter: payload.gun.bullet.distance_from_center,
                angle: payload.gun.bullet.alpha,
            },
            gunAngle: payload.gun.alpha,
        };
        for (let i = 0; i < payload.PiscesCount; i++) {
            state.piscesAngles.push((360/payload.PiscesCount)*i);
        }
        this.opponentFound(payload.penguin.name, payload.gun.name);
        this.onNewState(state);
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
        this.ws.send('newPlayer', { name: payload.username, mode: 'MULTI' });
    }

    onNewCommand() {
        console.log('MultiPlayerStrategy.fn.onNewCommand');
        // TODO: init penguin and gun
        this.ws.send('newCommand');
    }
}