import GameStrategy from '../GameStrategy.js';
import { EVENTS } from '../../utils/events.js';
import WS from '../../modules/WebSocket.js';
import Bus from '../../scripts/EventBus.js';

export default class MultiPlayerStrategy extends GameStrategy {
    constructor() {
        console.log('MultiPlayerStrategy.fn');
        super();
        Bus.on('ws-checked', (status) => {
            console.log('CHECK WS');
            if (status === 200) {
                this.ws = new WS('multi');
                console.log('CHECK WS GOOD');
            } else {
                console.log('CHECK WS BAD');
                Bus.off('ws-checked');
                super.destroy();
                Bus.emit('error-cookie');
            }
        });
        Bus.emit('checkWS', 'Multi');
    }

    readyToStart(payload) {
        console.log('MultiPlayerStrategy.fn.readyToStart', arguments);

        this.waitOpponent();
        this.ws.send('newPlayer', { name: payload.username, mode: 'MULTI' });
    }

    roundOver(payload) {
        console.log('MultiPlayerStrategy.fn.roundOver', arguments);
        payload.mode = 'MULTI';
        Bus.emit(EVENTS.FINISH_THE_ROUND, payload);
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
        this.onNewState(state);
        this.startGame();
    }

    onNewState(state) {
        this.state = state;

        this.setNewGameState(this.state);
    }

    onNewRound(payload) {
        console.log('MultiPlayerStrategy.fn.onNewRound');
        // TODO: init penguin and gun
        this.ws.send('newRound', { name: payload.username, mode: 'MULTI' });
    }

    onFinishRound(payload) {
        console.log('on finish round', payload);
        this.unsubscribe('SIGNAL_TO_WAIT_OPPONENT');
        this.roundOver(payload);
    }

    onWaitOpponent() {
        this.waitOpponent();
    }

    onNewCommand(payload) {
        console.log('MultiPlayerStrategy.fn.onNewCommand');
        // TODO: init penguin and gun
        this.ws.send('newCommand', { name: payload.username, mode: 'MULTI' });
    }
}