import BaseView from './BaseView.js';
import Bus from '../scripts/EventBus.js';
import GameTmpl from '../components/Game/Game.tmpl.xml';

export default class GameView extends BaseView {
    constructor(el, mode) {
        super(el);
        this.game = null;
        this.mode = mode;
        this.canvases = {};
    }

    getCanvases() {
        return this.canvases;
    }

    getMode() {
        return this.mode;
    }

    setMode(mode) {
        this.mode = mode;
    }

    setGame(game) {
        this.game = game;
    }
    
    show() {
        super.show();
        if (!this.game) {
            Bus.off('destroy-game');
            Bus.on('destroy-game', () => {
                this.game.destroy();
                delete this.game;
                this.game = null;
            });
            Bus.off('get-game-mode');
            Bus.emit('start-game', this);
        } else {
            Bus.emit('destroy-game');
        }
    }
    
    render() {
        this.el.innerHTML = '';
        this.el.innerHTML = GameTmpl();

        let innerWidth = window.innerWidth;
        let innerHeight = window.innerHeight;
        if (innerWidth === 400 || innerHeight === 400) {
            innerWidth = 300;
            innerHeight = 300;
        }

        const fishCanvas = this.el.querySelector('.canvas-fish');
        if (innerWidth > innerHeight) {
            fishCanvas.width = fishCanvas.height = innerHeight*0.8;
        } else {
            fishCanvas.width = fishCanvas.height = innerWidth*0.8;
        }
        const penguinCanvas = this.el.querySelector('.canvas-penguin');
        if (innerWidth > innerHeight) {
            penguinCanvas.width = penguinCanvas.height = innerHeight*0.8;
        } else {
            penguinCanvas.width = penguinCanvas.height = innerWidth*0.8;
        }
        const snowCanvas = this.el.querySelector('.canvas-snow');
        if (innerWidth > innerHeight) {
            snowCanvas.width = snowCanvas.height = innerHeight*0.8;
        } else {
            snowCanvas.width = snowCanvas.height = innerWidth*0.8;
        }
        const gunCanvas = this.el.querySelector('.canvas-gun');
        if (innerWidth > innerHeight) {
            gunCanvas.width = gunCanvas.height = innerHeight*0.8;
        } else {
            gunCanvas.width = gunCanvas.height = innerWidth*0.8;
        }

        this.canvases = {
            fish: fishCanvas,
            penguin: penguinCanvas,
            snow: snowCanvas,
            gun: gunCanvas,
        };

        const home = this.el.getElementsByClassName('game__header__home')[0];
        if (home !== undefined) {
            home.addEventListener('click', (event) => {
                event.preventDefault();
                Bus.emit('SIGNAL_FINISH_GAME', {message: 'EXIT'});
                Bus.emit('open-menu');
            });
        }
    }
}
