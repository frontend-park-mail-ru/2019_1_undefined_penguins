import GameStrategy from '../GameStrategy.js';
export default class SinglePlayerStrategy extends GameStrategy {
    constructor() {
        console.log('SinglePlayerStrategy.fn');
        super();

        this.interval = null;
    }

    readyToStart(payload) {
        this.me = payload.username;
        this.opponent = 'Jhon Snow';
        this.fireOpponentFound(this.me, this.opponent);
        this.fireStartGame();
        this.state = {
            bullets: [],
            me: {
                xpos: 1,
                ypos: 1,
                hp: 10
            },
            opponent: {
                xpos: 18,
                ypos: 32,
                hp: 10
            }
        };

        this.startGameLoop();
    }
}