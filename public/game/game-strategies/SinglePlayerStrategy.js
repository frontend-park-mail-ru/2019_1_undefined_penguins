import GameStrategy from '../GameStrategy.js';
import { EVENTS } from '../../utils/events.js';
import WS from '../../modules/WebSocket.js';
import Bus from '../../scripts/EventBus.js';

export default class SinglePlayerStrategy extends GameStrategy {
    constructor() {
        console.log('SinglePlayerStrategy.fn');
        super();
        // PENGUIN_TURN_AROUND
        this.subscribe(EVENTS.PENGUIN_TURN_AROUND, 'penguinTurnAround');
        this.ws = new WS('game');

        // this.interval = null;
        this.subscribe('SIGNAL_START_THE_GAME', 'onStart');
        this.subscribe('SIGNAL_NEW_GAME_STATE', 'onNewState');
        this.subscribe('SIGNAL_FINISH_GAME', 'onFinishGame');
        this.subscribe('SIGNAL_TO_WAIT_OPPONENT', 'onWaitOpponent');
    }

    penguinTurnAround(){
        this.state.clockwise = !this.state.clockwise;
    }

//     readyToStart(payload) {
//         this.me = payload.username;
//         this.opponent = 'Jhon Snow';
//         this.opponentFound(this.me, this.opponent);
//         this.startGame();
//         this.sideLength = 100;
//         this.state = {
//             penguinAngle: Math.floor(Math.random()*360),
//             piscesAngles: [
//                 15,
//                 30,
//                 45,
//             ],
//             clockwise: true,
//             bullet:{
//                 distanceFromCenter: 0,
//                 angle: 0,
//             },
//             gunAngle: 0,
//         };
//         this.score = 0;
//         this.startGameLoop();
      
    onStart(payload) {
        console.log('SinglePlayerStrategy.fn.onStart', arguments);
        // console.dir(payload);
        // TODO: choose who is who
        this.opponentFound(payload.penguin.name, payload.gun.name);
        this.sideLength = 100;
        this.state = {
            penguinAngle: Math.floor(Math.random()*360),
            piscesAngles: [],
            clockwise: true,
            bullet:{
                distanceFromCenter: 0,
                angle: 0,
            },
            gunAngle: 0,
        };
        for (let i = 0; i < payload.piscesCount; i++) {
            this.state.piscesAngles.push((360/payload.piscesCount)*i);
        }
        this.score = 0;
        // this.startGameLoop();
        console.log('started');
        this.startGame();
    }


    // onNewState(state) {
    //     this.state = state;


    gameLoop() {
        if (this.state.penguinAngle == 360) {
            this.state.penguinAngle = 0;
        }
        if (this.state.penguinAngle == -1) {
            this.state.penguinAngle = 359;
        }
        let eaten = -1;
        for (let i = 0; i < this.state.piscesAngles.length; i++) {
            if (this.state.piscesAngles[i] === this.state.penguinAngle) {
                this.score++;
                // this.scoreElement.innerText = this.score;
                console.log("eat");

                eaten = i;
                break;
            }
        }
        if (eaten !== -1) {
            const angle = this.state.piscesAngles[eaten];
            Bus.emit(EVENTS.EAT_FISH, {angle});
            this.state.piscesAngles.splice(eaten, 1);
            if (this.state.piscesAngles.length === 0) {
                Bus.emit('open-win-view', this.score);
                super.destroy();
                this.stopGameLoop();
                // Bus.emit('next-level', this.score);
            }
        }

        //считаем угол пингвина
        if (this.state.clockwise) {
            this.state.penguinAngle++;
        } else {
            this.state.penguinAngle--;
        }

        //считаем пулю и возможное соприкосновение с пингвином
        if (this.state.bullet.distanceFromCenter > this.sideLength*0.8/2) {
            if (this.state.bullet.angle % 360 >= this.state.penguinAngle - 7 && this.state.bullet.angle % 360 <= this.state.penguinAngle + 7) {
                // Bus.emit('penguin-injured', this.score);
                Bus.emit('open-lost-view', this.score);
                super.destroy();
                this.stopGameLoop();

                // return;
            } 
            if (this.state.clockwise) {
                this.state.bullet.angle = this.state.penguinAngle + Math.floor(Math.random()*100);
            } else {
                this.state.bullet.angle = this.state.penguinAngle - Math.floor(Math.random()*100);
            }
            this.state.bullet.distanceFromCenter = 0;
            
        }
        this.state.bullet.distanceFromCenter += 5;
        this.setNewGameState(this.state);
    }

    onFinishGame(payload) {
        this.gameOver(payload.message || 'Игра окончена');
    }

    onWaitOpponent() {
        this.waitOpponent();
    }

    readyToStart(payload) {
        console.log('SinglePlayerStrategy.fn.readyToStart', arguments);
        this.me = payload.username;
        // this.waitOpponent();
        this.ws.send('newPlayer', { name: payload.username, mode: 'SINGLE' });
    }

    onNewCommand(payload) {
        console.log('SinglePlayerStrategy.fn.onNewCommand', payload);
        // check on SPACE click
        this.ws.send('newCommand', { name: this.me, command: 'ROTATE' });
    }

    // readyToStart(payload) {
    // this.me = payload.username;
    // this.opponent = 'Jhon Snow';
    // this.opponentFound(this.me, this.opponent);
    // this.startGame();
    // this.sideLength = 100;
    // this.state = {
    //     penguinAngle: Math.floor(Math.random()*360),
    //     piscesAngles: [
    //         15,
    //         30,
    //         45,
    //     ],
    //     clockwise: true,
    //     bullet:{
    //         distanceFromCenter: 0,
    //         angle: 0,
    //     },
    //     gunAngle: 0,
    // };
    // this.score = 0;
    // this.startGameLoop();
    // console.log('started');
    // }

    // gameLoop() {
        // if (this.state.penguinAngle == 360) {
        //     this.state.penguinAngle = 0;
        // }
        // if (this.state.penguinAngle == -1) {
        //     this.state.penguinAngle = 359;
        // }
        // let eaten = -1;
        // for (let i = 0; i < this.state.piscesAngles.length; i++) {
        //     if (this.state.piscesAngles[i] === this.state.penguinAngle) {
        //         this.score++;
        //         // this.scoreElement.innerText = this.score;
        //         console.log("eat");

        //         eaten = i;
        //         break;
        //     }
        // }
        // if (eaten != -1) {
        //     const angle = this.state.piscesAngles[eaten];
        //     Bus.emit(EVENTS.EAT_FISH, {angle});
        //     this.state.piscesAngles.splice(eaten, 1);
        //     if (this.state.piscesAngles.length === 0) {
        //         console.log("win");
        //         // Bus.emit('next-level', this.score);
        //     }
        // }

        // //считаем угол пингвина
        // if (this.state.clockwise) {
        //     this.state.penguinAngle++;
        // } else {
        //     this.state.penguinAngle--;
        // }

        // //считаем пулю и возможное соприкосновение с пингвином
        // if (this.state.bullet.distanceFromCenter > this.sideLength*0.8/2) {
        //     if (this.state.bullet.angle % 360 >= this.state.penguinAngle - 7 && this.state.bullet.angle % 360 <= this.state.penguinAngle + 7) {
        //         // Bus.emit('penguin-injured', this.score);
        //         console.log("lose", this.state);
        //         // return;
        //     } 
        //     if (this.state.clockwise) {
        //         this.state.bullet.angle = this.state.penguinAngle + Math.floor(Math.random()*100);
        //     } else {
        //         this.state.bullet.angle = this.state.penguinAngle - Math.floor(Math.random()*100);
        //     }
        //     this.state.bullet.distanceFromCenter = 0;

        // }
        // this.state.bullet.distanceFromCenter += 5;
        // this.setNewGameState(this.state);
    // }

    startGameLoop() {
        this.interval = setInterval(() => this.gameLoop(), 70);
    }

    stopGameLoop(){
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    destroy() {
        // super.destroy();

        // this.stopGameLoop();
    }

}