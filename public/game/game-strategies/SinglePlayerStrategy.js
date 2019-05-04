import GameStrategy from '../GameStrategy.js';
import { EVENTS } from '../../utils/events.js';
import Bus from '../../scripts/EventBus.js';

export default class SinglePlayerStrategy extends GameStrategy {
    constructor() {
        console.log('SinglePlayerStrategy.fn');
        super();

        this.interval = null;
    }

    readyToStart(payload) {
        this.me = payload.username;
        this.opponent = 'Jhon Snow';
        this.opponentFound(this.me, this.opponent);
        this.startGame();
        this.sideLength = 100;
        this.state = {
            penguinAngle: Math.floor(Math.random()*360),
            piscesAngles: [
                15,
                30,
                45,
            ],
            clockwise: true,
            bullet:{
                distanceFromCenter: 0,
                angle: 0,
            },
            gunAngle: 0,
        };
        this.score = 0;
        this.startGameLoop();
    }

    gameLoop() {
        if (this.state.penguinAngle == 360) {
            this.state.penguinAngle = 0;
        }
        if (this.state.penguinAngle == -1) {
            this.state.penguinAngle = 359;
        }
        let eaten = -1;
        for (let i = 0; i < this.piscesAngles.length; i++) {
            if (this.piscesAngles[i] === this.state.penguinAngle) {
                this.score++;
                // this.scoreElement.innerText = this.score;
                eaten = i;
                break;
            }
        }
        if (eaten != -1) {
            const angle = this.state.piscesAngles[eaten];
            Bus.emit(EVENTS.EAT_FISH, {angle});
            this.piscesAngles.splice(eaten, 1);
            if (this.state.piscesAngles.length === 0) {
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
                return;
            } else {
                if (this.state.clockwise) {
                    this.bullet.angle = this.state.penguinAngle + Math.floor(Math.random()*100);
                } else {
                    this.bullet.angle = this.state.penguinAngle - Math.floor(Math.random()*100);
                }
                this.bullet.distanceFromCenter = 0;
            }
        }
        this.bullet.distanceFromCenter += 5;
    }

    startGameLoop() {
        this.interval = setInterval(() => this.gameLoop(), 100);
    }
}