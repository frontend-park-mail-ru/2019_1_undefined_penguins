import GameStrategy from '../GameStrategy.js';
import { EVENTS } from '../../utils/events.js';
import WS from '../../modules/WebSocket.js';
import Bus from '../../scripts/EventBus.js';

export default class SinglePlayerStrategy extends GameStrategy {
    constructor() {
        super();
        Bus.on('ws-checked', (status) => {
            if (status === 200) {
                this.ws = new WS('single');
            } else {
                Bus.emit('open-menu');
                // TODO: message in modal
            }
        });
        Bus.emit('checkWS', 'Single');
    }

    readyToStart(payload) {
        this.me = payload.username;

        this.ws.send('newPlayer', { name: payload.username, mode: 'SINGLE' });
    }
    
    roundOver(payload) {
        payload.mode = 'SINGLE';
        Bus.emit(EVENTS.FINISH_THE_ROUND, payload);
    }

    onStart(payload) {
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

    onFinishRound(payload) {
        this.roundOver(payload);
    }

    onNewRound(payload) {
        // TODO: init penguin and gun
        this.ws.send('newRound', { name: payload.username, mode: 'SINGLE' });
    }

    onNewCommand(payload) {
        // check on SPACE click
        this.ws.send('newCommand', { name: payload.username, mode: 'SINGLE' });
    }

}